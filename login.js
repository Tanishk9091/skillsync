
        // Navbar functionality
const bar = document.getElementById('bar');
const menu = document.getElementById('menu');

bar.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Form switching functionality
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');

        function switchForms(hideForm, showForm) {
            hideForm.classList.remove('fade-in');
            setTimeout(() => {
                hideForm.style.display = 'none';
                showForm.style.display = 'block';
                setTimeout(() => showForm.classList.add('fade-in'), 10);
            }, 300);
        }

        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            switchForms(loginSection, signupSection);
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            switchForms(signupSection, loginSection);
        });

        // Form validation
        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function validatePassword(password) {
            return password.length >= 8;
        }

        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function clearError(elementId) {
            const errorElement = document.getElementById(elementId);
            errorElement.style.display = 'none';
        }

        // Login form handling
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (!validateEmail(email)) {
                showError('login-email-error', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('login-email-error');
            }

            if (!password) {
                showError('login-password-error', 'Password is required');
                isValid = false;
            } else {
                clearError('login-password-error');
            }

            if (isValid) {
                // Here you would typically make an API call to your backend
                console.log('Login form submitted:', { email, password });
            }
        });

        // Signup form handling
        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const fullname = document.getElementById('signup-fullname').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            if (!fullname || fullname.length < 2) {
                showError('signup-fullname-error', 'Please enter your full name (minimum 2 characters)');
                isValid = false;
            } else {
                clearError('signup-fullname-error');
            }

            if (!validateEmail(email)) {
                showError('signup-email-error', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('signup-email-error');
            }

            if (!validatePassword(password)) {
                showError('signup-password-error', 'Password must be at least 8 characters long');
                isValid = false;
            } else {
                clearError('signup-password-error');
            }

            if (password !== confirmPassword) {
                showError('signup-confirm-error', 'Passwords do not match');
                isValid = false;
            } else {
                clearError('signup-confirm-error');
            }

            if (isValid) {
                // Here you would typically make an API call to your backend
                console.log('Signup form submitted:', { fullname, email, password });
            }
        });