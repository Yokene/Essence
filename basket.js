document.addEventListener("DOMContentLoaded", () => {

    // ================== STATE ==================
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartOverlay = document.getElementById("cartOverlay");
    const cartItems   = document.getElementById("cartItems");
    const cartCount   = document.getElementById("cardCount");
    const openCartBtn = document.querySelector(".basket-btn");
    const closeCartBtn = document.getElementById("closeCart");
    const toast = document.getElementById("toast");
    let toastTimer;

    // ================== HELPERS ==================
    function getItem(name) {
        return cart.find(i => i.name === name);
    }

    function getTotalCount() {
        return cart.reduce((sum, i) => sum + i.count, 0);
    }

    function getTotalPrice() {
        return cart.reduce((sum, i) => {
            return sum + parseInt(i.price.replace("$", "")) * i.count;
        }, 0);
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    // ================== UI SYNC ==================
    function updateCards() {
        document.querySelectorAll(".product-card").forEach(card => {
            const name = card.querySelector(".card-h1").textContent;
            const countEl = card.querySelector(".count");
            const item = cart.find(i => i.name === name);
    
            if (item && item.bought) {
                card.style.borderColor = "green";
            } else {
                card.style.borderColor = "black";
            }

            // Счётчик берём из cart, если есть
            if (countEl) countEl.textContent = item ? item.count : 1;
        });
    
        cartCount.textContent = cart.reduce((sum, i) => sum + i.count, 0);

        if (cart.length > 0) {
            openCartBtn.classList.add("active");
        } else {
            openCartBtn.classList.remove("active");
        }
    }

    function renderCart() {
        cartItems.innerHTML = "";

        cart.forEach(item => {
            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
                <img src="${item.image}" class="cart-img">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                    <div class="product-count-js">
                        <button class="minus">−</button>
                        <span class="count">${item.count}</span>
                        <button class="plus">+</button>
                    </div>
                </div>
                <button class="remove-btn" data-name="${item.name}">✖</button>
            `;

            cartItems.appendChild(div);
        });

        document.getElementById("cartTotal").textContent = "$" + getTotalPrice();
    }

    function updateUI() {
        renderCart();
        updateCards();
        saveCart()
    }

    function showToast() {
        if (!toast) return;

        toast.classList.add("show");
        toast.classList.remove("hide");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
            toast.classList.add("hide");
        }, 1500);
    }

    // ================== EVENTS ==================
    document.addEventListener("click", (e) => {

        const card = e.target.closest(".product-card");
        const cartItem = e.target.closest(".cart-item");
        const buyBtn = e.target.closest(".card-buy");

        // ===== PLUS / MINUS В КОРЗИНЕ =====
        if (cartItem && (e.target.classList.contains("plus") || e.target.classList.contains("minus"))) {
            const name = cartItem.querySelector("h3").textContent;
            const item = getItem(name);

            if (e.target.classList.contains("plus")) item.count++;
            if (e.target.classList.contains("minus") && item.count > 1) item.count--;

            updateUI();
            return;
        }

        // ===== PLUS / MINUS В КАРТОЧКЕ =====
        if (card && (e.target.classList.contains("plus") || e.target.classList.contains("minus"))) {
            const name = card.querySelector(".card-h1").textContent;
            const countEl = card.querySelector(".count");
            let currentVal = parseInt(countEl.textContent);
            
            // Ищем, есть ли этот товар уже в корзине
            const itemInCart = getItem(name);
    
            if (e.target.classList.contains("plus")) currentVal++;
            if (e.target.classList.contains("minus") && currentVal > 1) currentVal--;
    
            // Если товар в корзине — обновляем и его тоже!
            if (itemInCart) {
                itemInCart.count = currentVal;
                updateUI(); // Это обновит корзину и счетчики везде
            } else {
                // Если товара нет в корзине — просто меняем цифру в HTML карточки
                countEl.textContent = currentVal;
            }
            return;
        }
        

        // ===== КУПИТЬ =====
        if (buyBtn) {
            const card  = e.target.closest(".product-card");
            const name  = card.querySelector(".card-h1").textContent;
            const price = card.querySelector(".info-cost").textContent;
            const image = card.querySelector(".card-image").src;
            const count = parseInt(card.querySelector(".count").textContent);
        
            let item = getItem(name);
        
            if (!item) {
                cart.push({ name, price, image, count, bought: true });
                showToast();
            } else {
                item.count = count;
                item.bought = true;
            }
        
            updateUI();
            return;
        }
        

        // ===== УДАЛИТЬ ИЗ КОРЗИНЫ =====
        if (e.target.classList.contains("remove-btn")) {
            const name = e.target.dataset.name;
            cart = cart.filter(i => i.name !== name);

            updateUI();
            return;
        }

        // ===== ОЧИСТИТЬ ВСЁ =====
        if (e.target.id === "deleteBtn") {
            cart = [];
            updateUI();
            return;
        }
    });

    // ================== OPEN / CLOSE CART ==================
    openCartBtn.addEventListener("click", () => {
        cartOverlay.classList.add("active");
        document.body.classList.add("no-scroll");
        localStorage.setItem("cartOpen", "true");
    });

    closeCartBtn.addEventListener("click", () => {
        cartOverlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
        localStorage.setItem("cartOpen", "false");
    });

    // первый рендер
    updateUI();

    if (localStorage.getItem("cartOpen") === "true") {
        cartOverlay.classList.add("active")
        document.body.classList.add("no-scroll")
    }
    
});