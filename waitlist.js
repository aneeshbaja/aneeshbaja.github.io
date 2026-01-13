// Waitlist Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waitlistForm');
    const formResponse = document.getElementById('formResponse');
    const submitButton = form.querySelector('.btn-submit');
    
    // IMPORTANT: Replace this with your Google Apps Script Web App URL
    // You'll get this URL after setting up the Google Apps Script (see instructions)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqP6uU4ahoDk9PHEr6DWxNGN_T6rce6UZf19STwCz6ao_F3aqlgT80XTRvHktPW8ysSw/exec';

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Clear previous messages
            formResponse.textContent = '';
            formResponse.className = 'form-response';
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                school: document.getElementById('school').value.trim() || 'N/A'
            };
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showResponse('Please enter a valid email address.', 'error');
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                return;
            }
            
            try {
                // Check if Google Script URL is configured
                if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                    throw new Error('Google Apps Script URL not configured. Please set up the Google Apps Script first.');
                }
                
                // Send data to Google Apps Script
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Required for Google Apps Script
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                // Since we're using no-cors mode, we can't read the response
                // But we'll assume success if no error is thrown
                showResponse('Thank you! We\'ll be in touch soon!', 'success');
                form.reset();
                
            } catch (error) {
                console.error('Error submitting form:', error);
                showResponse('There was an error submitting your information. Please try again later or contact us directly.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }
        });
    }
    
    function showResponse(message, type) {
        formResponse.textContent = message;
        formResponse.className = `form-response ${type}`;
        
        // Scroll to response if on mobile
        if (window.innerWidth <= 768) {
            formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
});
