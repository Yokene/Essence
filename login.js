document.addEventListener("DOMContentLoaded", () => {

    const loginOverlay = document.getElementById("loginOverlay")
    const closeLogin = document.getElementById("closeLogin")
    const openLogin = document.getElementById("openLogin")

    if (localStorage.getItem("loginOpen") === "true") {
        loginOverlay.classList.add("active");
        document.body.classList.add("no-scroll");
    }

    openLogin.addEventListener("click", () => {
        loginOverlay.classList.add("active");
        document.body.classList.add("no-scroll")
        localStorage.setItem("loginOpen", "true");
    })

    closeLogin.addEventListener("click", () => {
        loginOverlay.classList.remove("active");
        document.body.classList.remove("no-scroll")
        localStorage.removeItem("loginOpen");
    })

})