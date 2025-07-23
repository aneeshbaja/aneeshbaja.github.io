document.addEventListener('DOMContentLoaded', function() {
    
    // Video Modal
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="video-wrapper">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                    title="Campanion Demo" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Open modal when clicking video placeholder
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    }

    // Close modal when clicking the close button
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Pause video when closing modal
            const iframe = document.querySelector('.video-wrapper iframe');
            if (iframe) {
                const src = iframe.src;
                iframe.src = src; // Reset the iframe to stop the video
            }
        });
    }

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Pause video when closing modal
            const iframe = document.querySelector('.video-wrapper iframe');
            if (iframe) {
                const src = iframe.src;
                iframe.src = src;
            }
        }
    });

    // Sticky header on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (mobileMenuBtn && window.innerWidth <= 992) {
                    mobileMenuBtn.click();
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission for teacher signup
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        const emailInput = ctaForm.querySelector('.email-input');
        const submitBtn = ctaForm.querySelector('.btn-primary');
        
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Here you would typically send the email to your server
                console.log('Teacher signup:', email);
                
                // Show success message
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Welcome Aboard!';
                    submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                    
                    // Show welcome message
                    const welcomeMessage = document.createElement('div');
                    welcomeMessage.className = 'welcome-message';
                    welcomeMessage.innerHTML = `
                        <h3>Thank you for your interest in Campanion!</h3>
                        <p>We've sent a welcome email to ${email} with next steps to get started.</p>
                    `;
                    ctaForm.parentNode.insertBefore(welcomeMessage, ctaForm.nextSibling);
                    
                    // Reset form after 5 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        emailInput.value = '';
                        welcomeMessage.style.opacity = '0';
                        setTimeout(() => welcomeMessage.remove(), 500);
                    }, 5000);
                }
            } else {
                // Show error
                emailInput.style.borderColor = '#ff6b6b';
                emailInput.placeholder = 'Please enter a valid email';
                emailInput.classList.add('error');
                
                setTimeout(() => {
                    emailInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    emailInput.placeholder = 'Enter your school email';
                    emailInput.classList.remove('error');
                }, 2000);
            }
        });
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Animate elements on scroll with staggered delay
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .section-title, .section-subtitle, .testimonial');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                // Add staggered delay based on element index
                const delay = index * 100; // 100ms delay between each element
                setTimeout(() => {
                    element.style.animationDelay = `${delay}ms`;
                    element.classList.add('animate-fade-in');
                }, 100);
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#signup') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                mobileMenuBtn.click();
            }
        });
    });
});
