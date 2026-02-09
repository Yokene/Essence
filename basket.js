document.addEventListener("DOMContentLoaded", () => {

    let cart = [];

    const cartOverlay = document.getElementById("cartOverlay");
    const cartItems   = document.getElementById("cartItems");
    const cartCount   = document.getElementById("cardCount");
    const openCartBtn = document.querySelector(".basket-btn");
    const closeCartBtn = document.getElementById("closeCart");

    // 🔹 Обновление рамок карточек в соответствии с корзиной
    function updateCardBorders() {
        document.querySelectorAll(".product-card").forEach(card => {
            const name = card.querySelector(".card-h1").textContent;
            if (cart.find(item => item.name === name)) {
                card.style.border = "2px solid green";
            } else {
                card.style.border = "2px solid black";
            }
        });

        if (cart.length > 0) {
            openCartBtn.classList.add("active");
        } else {
            openCartBtn.classList.remove("active");
        }
    }

    // 🔹 Отрисовка корзины
    function renderCart() {
        cartItems.innerHTML = "";

        let total = 0;

        cart.forEach(item => {
            total += parseInt(item.price.replace("$", ""));

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <img src="${item.image}" class="cart-img">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                </div>
                <button class="remove-btn" data-name="${item.name}">✖</button>
            `;

            cartItems.appendChild(div);
        });

        document.getElementById("cartTotal").textContent = "$" + total;
        cartCount.textContent = cart.length;
    }

    // 🔹 Делегирование кликов
    document.addEventListener("click", (e) => {

        // Клик по "Придбати"
        if (e.target.classList.contains("card-buy")) {
            const card  = e.target.closest(".product-card");
            const name  = card.querySelector(".card-h1").textContent;
            const price = card.querySelector(".info-cost").textContent;
            const image = card.querySelector(".card-image").src;

            if (!cart.find(item => item.name === name)) {
                cart.push({ name, price, image });
            }

            renderCart();
            updateCardBorders(); // 🔹 рамки карточек синхронизированы
        }

        // Клик по "Удалить" в корзине
        if (e.target.classList.contains("remove-btn")) {
            const name = e.target.dataset.name;
            cart = cart.filter(item => item.name !== name);

            renderCart();
            updateCardBorders(); // 🔹 рамки карточек синхронизированы
        }

        if (e.target.id === "deleteBtn") {
            cart = []
            renderCart();
            updateCardBorders();
        }
    });

    // 🔹 Открыть корзину
    openCartBtn.addEventListener("click", () => {
        cartOverlay.style.display = "flex";
        document.body.classList.add("no-scroll")
    });

    // 🔹 Закрыть корзину
    closeCartBtn.addEventListener("click", () => {
        cartOverlay.style.display = "none";
        document.body.classList.remove("no-scroll")
    });

    // 🔹 При загрузке страницы сразу обновляем рамки (на случай, если в HTML есть "купленные" карточки)
    updateCardBorders();
});
