document.addEventListener('DOMContentLoaded', function() {
    // Header scroll behavior
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Hero interactive orbs – container follows mouse for subtle parallax
    const heroEl = document.querySelector('.hero');
    const heroInteractive = document.querySelector('.hero-interactive');

    if (heroEl && heroInteractive) {
        let mouseX = 0.5, mouseY = 0.5;
        let currentX = 0.5, currentY = 0.5;

        heroEl.addEventListener('mousemove', function(e) {
            const rect = heroEl.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width;
            mouseY = (e.clientY - rect.top) / rect.height;
        });

        heroEl.addEventListener('mouseleave', function() {
            mouseX = 0.5;
            mouseY = 0.5;
        });

        function tick() {
            currentX += (mouseX - currentX) * 0.04;
            currentY += (mouseY - currentY) * 0.04;
            const dx = (currentX - 0.5) * 20;
            const dy = (currentY - 0.5) * 20;
            heroInteractive.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});
