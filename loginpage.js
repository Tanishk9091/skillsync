// ----------------- NAVBAR -----------------
const bar = document.getElementById('bar');
const menu = document.getElementById('menu');

if (bar && menu) {
  bar.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

// ----------------- FORM SWITCHING -----------------
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');

function switchForms(hideForm, showForm) {
  if (!hideForm || !showForm) return;

  hideForm.classList.remove('fade-in');
  hideForm.classList.add('fade-out');

  setTimeout(() => {
    hideForm.style.display = 'none';
    hideForm.classList.remove('fade-out');

    showForm.style.display = 'block';
    setTimeout(() => showForm.classList.add('fade-in'), 10);
  }, 300);
}

if (showSignup && showLogin) {
  showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    switchForms(loginSection, signupSection);
  });

  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    switchForms(signupSection, loginSection);
  });
}

// ----------------- VALIDATION HELPERS -----------------
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePassword(password) {
  return password.trim().length >= 8;
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}

// ----------------- FORM HANDLERS -----------------
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// ---- LOGIN ----
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const email = document.getElementById('login-email').value.trim();
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
      alert("✅ Login successful! Redirecting...");
      // Simulate redirect
      window.location.href = "dashboard.html";
    }
  });
}

// ---- SIGNUP ----
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const fullname = document.getElementById('signup-fullname').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (!fullname || fullname.length < 2) {
      showError('signup-fullname-error', 'Please enter your full name (min 2 characters)');
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
      alert("🎉 Signup successful! You can now login.");
      // Switch back to login after signup success
      switchForms(signupSection, loginSection);
    }
  });
}
