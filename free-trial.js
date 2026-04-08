// Free Trial Form Handler
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('trialForm');
    var formResponse = document.getElementById('formResponse');
    var submitBtn = form.querySelector('.trial-submit');
    var btnText = submitBtn.querySelector('.btn-text');
    var btnLoader = submitBtn.querySelector('.btn-loader');

    var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqP6uU4ahoDk9PHEr6DWxNGN_T6rce6UZf19STwCz6ao_F3aqlgT80XTRvHktPW8ysSw/exec';

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous messages
        formResponse.textContent = '';
        formResponse.className = 'form-response';

        var name = document.getElementById('trial-name').value.trim();
        var email = document.getElementById('trial-email').value.trim();
        var subject = document.getElementById('trial-subject').value;

        // Validate email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formResponse.textContent = 'Please enter a valid email address.';
            formResponse.className = 'form-response error';
            return;
        }

        // Disable and show loading
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                school: subject,
                source: 'Free Trial Signup'
            })
        }).then(function() {
            formResponse.textContent = "You're in! We'll send you everything you need to get started.";
            formResponse.className = 'form-response success';
            form.reset();
            // Track conversion
            if (typeof fbq !== 'undefined') {
                fbq('track', 'StartTrial');
            }
        }).catch(function() {
            formResponse.textContent = "Thanks, " + name + "! We'll be in touch at " + email + ".";
            formResponse.className = 'form-response success';
        }).finally(function() {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        });
    });
});
