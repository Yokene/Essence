const header = document.querySelector('.header');
const navBtns = document.querySelectorAll('.nav-btn');

let isScrolled = false;

window.addEventListener('scroll', () => {
    const y = window.scrollY;

    if (!isScrolled && y > 70) {
        isScrolled = true;

        header.classList.add('scrolled');
        navBtns.forEach(btn => btn.classList.add('scrolled'));
    }

    if (isScrolled && y < 20) {
        isScrolled = false;

        header.classList.remove('scrolled');
        navBtns.forEach(btn => btn.classList.remove('scrolled'));
    }
});
