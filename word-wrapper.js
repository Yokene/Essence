document.addEventListener("DOMContentLoaded", () => {
    const words = ["Вишуканість.", "Баланс.", "Характер."]
    const element = document.getElementById("dynamicWord")

    let wordIndex = 0
    let letterIndex = 0
    let isDeleting = 0

    const typingSpeed = 80
    const deletingSpeed = 50
    const pauseAfterTyping = 1500
    const pauseAfterDeleting = 400

    function typeEffect() {
        const currentWord = words[wordIndex]

        if (!isDeleting) {
            element.textContent = currentWord.slice(0, letterIndex + 1)
            letterIndex++

            if (letterIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, pauseAfterTyping)
            }
        } else {
            element.textContent = currentWord.slice(0, letterIndex - 1)
            letterIndex--

            if (letterIndex === 0){
                isDeleting = false
                wordIndex = (wordIndex + 1) % words.length
                setTimeout(() => {}, pauseAfterDeleting)
            }
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeEffect, speed)
    }

    typeEffect();
})