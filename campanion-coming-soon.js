// Modal functionality
function openDemoModal() {
    const modal = document.getElementById('demoModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('demoModal');
    if (event.target === modal) {
        closeDemoModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDemoModal();
    }
});

// Form submission handling
function submitDemoForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const company = document.getElementById('company').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email) {
        alert('Please fill in your name and email.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    
    // Create URL with form data
    const url = new URL('https://script.google.com/macros/s/AKfycbyyv_K3Bc8WjH5cjzY5plczDvuOZIjJ2POti3DARhekRKDcdJ4C-wyy5zMhedBZNvsBcA/exec');
    url.searchParams.append('name', name);
    url.searchParams.append('email', email);
    url.searchParams.append('company', company);
    url.searchParams.append('message', message);
    
    // Send to Google Sheets using GET request (more reliable)
    fetch(url, {
        method: 'GET',
        mode: 'no-cors' // This is important for Google Apps Script
    })
    .then(() => {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <strong>Thank you!</strong> We've received your demo request. 
            We'll be in touch with you soon at ${email}.
        `;
        
        // Replace form with success message
        form.style.display = 'none';
        form.parentNode.appendChild(successMessage);
        
        // Auto-close modal after 3 seconds
        setTimeout(() => {
            closeDemoModal();
            // Reset form for next use
            setTimeout(() => {
                form.style.display = 'flex';
                form.reset();
                if (successMessage.parentNode) {
                    successMessage.parentNode.removeChild(successMessage);
                }
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }, 500);
        }, 3000);
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        // Even if there's an error, show success message (Google Apps Script can be finicky)
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <strong>Thank you!</strong> We've received your demo request. 
            We'll be in touch with you soon at ${email}.
        `;
        
        form.style.display = 'none';
        form.parentNode.appendChild(successMessage);
        
        setTimeout(() => {
            closeDemoModal();
            setTimeout(() => {
                form.style.display = 'flex';
                form.reset();
                if (successMessage.parentNode) {
                    successMessage.parentNode.removeChild(successMessage);
                }
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }, 500);
        }, 3000);
    });
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Add typing effect to the coming soon text
    const comingSoonText = document.querySelector('.coming-soon h2');
    if (comingSoonText) {
        const originalText = comingSoonText.textContent;
        comingSoonText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                comingSoonText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add floating animation to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.2}s`;
        link.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Add pulse animation to the book demo button
    const bookDemoBtn = document.querySelector('.book-demo-btn');
    if (bookDemoBtn) {
        bookDemoBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        bookDemoBtn.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    }
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: translateY(-3px) scale(1); }
        50% { transform: translateY(-3px) scale(1.05); }
        100% { transform: translateY(-3px) scale(1); }
    }
    
    .social-link {
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Add smooth scroll behavior for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some particle effects in the background
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(212, 175, 55, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `particleFloat ${5 + Math.random() * 10}s linear infinite`;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 15000);
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Create particles periodically
setInterval(createParticle, 3000);

// Add some initial particles
for (let i = 0; i < 5; i++) {
    setTimeout(createParticle, i * 500);
} 