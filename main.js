document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile hamburger menu ---
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            const isOpen = hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Smooth scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 68, // nav height offset
                    behavior: 'smooth'
                });
            }
        });
    });
});
