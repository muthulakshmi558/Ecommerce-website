
  const leftSide = document.getElementById('left-side');
  const loginSide = document.getElementById('login-side');
  const rightSide = document.getElementById('right-side');
  const leftTitle = document.getElementById('left-title');
  const rightTitle = document.getElementById('right-title');
  const promptText = document.getElementById('prompt-text');
  const toggleBtn = document.getElementById('toggle-btn');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toggleBtn.addEventListener('click', () => {
    if (leftSide.style.display !== 'none') {
      leftSide.style.display = 'none';
      loginSide.style.display = 'block';
      leftTitle.textContent = 'Login';
      rightTitle.textContent = 'Create An Account';
      promptText.textContent = 'Don\'t have an account? Register here';
      toggleBtn.textContent = 'Register';
    } else {
      leftSide.style.display = 'block';
      loginSide.style.display = 'none';
      leftTitle.textContent = 'Customer Registration';
      rightTitle.textContent = 'Login';
      promptText.textContent = 'If you already have an account, login here';
      toggleBtn.textContent = 'Login';
    }
    clearErrors();
  });

  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
  }

  document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('register-email').value.trim().toLowerCase();
    const password = document.getElementById('register-password').value;

    let valid = true;
    if (fullname.length < 3) {
      document.getElementById('fullname-error').textContent = 'Please enter your full name (min 3 characters).';
      valid = false;
    }
    if (!isValidEmail(email)) {
      document.getElementById('register-email-error').textContent = 'Please enter a valid email.';
      valid = false;
    }
    if (password.length < 6) {
      document.getElementById('register-password-error').textContent = 'Password must be at least 6 characters.';
      valid = false;
    }
    if (!valid) return;

    let users = [];
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users'));
      if (Array.isArray(storedUsers)) {
      users = storedUsers;
      }
    } catch (e) {
      users = [];
    }  
  
  if (users.find(u => u.email === email)) {
      document.getElementById('register-email-error').textContent = 'Email already registered.';
      return;
    }

    users.push({ fullname, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert(`Registered successfully! Welcome, ${fullname}.`);
    window.location.href = "./Home.html";
  });

  document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    let valid = true;
    if (!isValidEmail(email)) {
      document.getElementById('login-email-error').textContent = 'Please enter a valid email.';
      valid = false;
    }
    if (!password) {
      document.getElementById('login-password-error').textContent = 'Please enter your password.';
      valid = false;
    }
    if (!valid) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      document.getElementById('login-error-msg').textContent = 'Invalid email or password.';
      return;
    }

    alert(`Welcome back, ${user.fullname}!`);
    window.location.href = "./Home.html";
  });
