document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nextButton = document.getElementById('nextButton');
    const loginForm = document.getElementById('loginForm');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error message
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Hide error message
    function hideError(errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }




    // Email input validation
    emailInput.addEventListener('blur', function() {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
            showError(emailError, 'Please enter a valid email address');
        } else {
            hideError(emailError);
        }
    });

    emailInput.addEventListener('input', function() {
        hideError(emailError);
    });

    // Password input validation
    passwordInput.addEventListener('blur', function() {
        const password = passwordInput.value;
        if (password && password.length < 6) {
            showError(passwordError, 'Password must be at least 6 characters long');
        } else {
            hideError(passwordError);
        }
    });

    passwordInput.addEventListener('input', function() {
        hideError(passwordError);
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validate email
        if (!email) {
            showError(emailError, 'Please enter your email address');
            emailInput.focus();
            return;
        }

        if (!validateEmail(email)) {
            showError(emailError, 'Please enter a valid email address');
            emailInput.focus();
            return;
        }

        // Validate password
        if (!password) {
            showError(passwordError, 'Please enter your password');
            passwordInput.focus();
            return;
        }

        if (password.length < 6) {
            showError(passwordError, 'Password must be at least 6 characters long');
            passwordInput.focus();
            return;
        }

        // Hide all errors
        hideError(emailError);
        hideError(passwordError);

        // Show loading state
        nextButton.classList.add('loading');
        nextButton.disabled = true;

        // Send data to backend server
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            nextButton.classList.remove('loading');
            nextButton.disabled = false;
            
            if (data.success) {
                // Show success message
                alert('Sign in successful! Redirecting to your account...');
                
                // Reset form
                emailInput.value = '';
                passwordInput.value = '';
            } else {
                alert('Sign in failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            nextButton.classList.remove('loading');
            nextButton.disabled = false;
            alert('Sign in failed. Please try again.');
        });
    });

    // Enter key handling
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
    });

    // Focus management
    emailInput.focus();

    // Add some demo functionality for common email domains
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.toLowerCase();
        if (email.includes('@outlook') || email.includes('@hotmail') || email.includes('@live')) {
            // Could add special handling for Microsoft accounts
        }
    });

    // Add accessibility improvements
    emailInput.setAttribute('autocomplete', 'email');
    passwordInput.setAttribute('autocomplete', 'current-password');
    
    // Add ARIA labels
    emailInput.setAttribute('aria-label', 'Email, phone, or Skype');
    passwordInput.setAttribute('aria-label', 'Password');
    nextButton.setAttribute('aria-label', 'Sign in');
});
