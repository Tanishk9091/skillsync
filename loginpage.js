document.addEventListener('DOMContentLoaded', () => {
    // ---ELEMENT SELECTORS---
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    const menu = document.getElementById('menu');

    // --- If already logged in, redirect to home page ---
    const alreadyLoggedInEmail = localStorage.getItem('loggedInUserEmail');
    if (alreadyLoggedInEmail) {
        window.location.href = 'login.html';
        return;
    }

    const updateNavbar = () => {
        const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
        const registerLi = document.querySelector('#w-btn')?.parentElement; // Find the Register button's list item

        if (loggedInUserEmail && registerLi) {
            const username = loggedInUserEmail.split('@')[0];

            registerLi.remove();

            // Add Welcome message and Logout button
            menu.innerHTML += `
                <li><span class="nav-username">Hi, ${username}</span></li>
                <li><a href="#" id="logout-btn">Logout</a></li>
            `;
        }
    };

    // --- NEW: Event listener for the logout button --
    menu.addEventListener('click', (e) => {
        if (e.target.id === 'logout-btn') {
            e.preventDefault();
            localStorage.removeItem('loggedInUserEmail');
            alert('You have been logged out.');
            window.location.reload();
        }
    });

    // --- Call the update function as soon as the page loads ---
    updateNavbar();

    // ---FORM SWITCHING LOGIC---
    const switchForms = (show, hide) => {
        hide.classList.remove('fade-in');
        setTimeout(() => {
            hide.style.display = 'none';
            show.style.display = 'block';
            setTimeout(() => {
                show.classList.add('fade-in');
            }, 50);
        }, 400);
    };

    if (showSignupLink) {
        showSignupLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchForms(signupSection, loginSection);
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchForms(loginSection, signupSection);
        });
    }

    // ---PASSWORD VISIBILITY TOGGLE---
    const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" /></svg>`;
    const eyeSlashIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 0 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L9.741 5.093A11.25 11.25 0 0 1 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69a1.762 1.762 0 0 1 0 1.113Z" /><path d="M15.75 12c0 .18-.013.357-.037.53l-1.996-1.996a3.001 3.001 0 0 0-4.498-4.498L7.841 7.841A3 3 0 0 0 12.75 12Zm-3-2.625a3.003 3.003 0 0 0-2.625-2.625L12 12l-2.25-2.25Z" /></svg>`;

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const passwordInput = icon.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.innerHTML = eyeSlashIcon;
            } else {
                passwordInput.type = 'password';
                icon.innerHTML = eyeIcon;
            }
        });
    });

    // ---VALIDATION LOGIC---
    const showError = (input, message) => {
        const errorDiv = document.getElementById(`${input.id}-error`);
        if (errorDiv) {
            input.classList.add('is-invalid');
            errorDiv.textContent = message;
            errorDiv.classList.add('show');
        }
    };

    const clearError = (input) => {
        const errorDiv = document.getElementById(`${input.id}-error`);
        if (errorDiv) {
            input.classList.remove('is-invalid');
            errorDiv.textContent = '';
            errorDiv.classList.remove('show');
        }
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // ---EVENT LISTENERS FOR FORMS---
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const email = document.getElementById('login-email');
            const password = document.getElementById('login-password');

            if (!email.value.trim()) {
                showError(email, 'Email is required.');
                isValid = false;
            } else if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(email);
            }

            if (!password.value.trim()) {
                showError(password, 'Password is required.');
                isValid = false;
            } else {
                clearError(password);
            }

            if (isValid) {
                // --- MODIFIED: Save email to localStorage on successful login ---
                localStorage.setItem('loggedInUserEmail', email.value);

                alert('Login Successful! Redirecting...');
                window.location.href = 'login.html'; // Or whatever your home page is
            }
        });
    }

    // if(signupForm) {
    //     // ... (signup form validation logic remains the same)
    // }
});