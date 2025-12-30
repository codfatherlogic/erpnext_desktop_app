const form = document.getElementById('loginForm');
const errorDiv = document.getElementById('error');
const loginBtn = document.getElementById('loginBtn');
const loading = document.getElementById('loading');

// Load saved credentials on startup
window.electronAPI.getSavedCredentials().then(({ url, username, password }) => {
  if (url) document.getElementById('url').value = url;
  if (username) document.getElementById('username').value = username;
  if (password) document.getElementById('password').value = password;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const url = document.getElementById('url').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;

  // Validate URL
  if (!url.startsWith('https://')) {
    showError('ERPNext URL must start with https://');
    return;
  }

  // Hide error
  errorDiv.classList.remove('show');
  
  // Disable form
  loginBtn.disabled = true;
  loginBtn.textContent = 'Signing in...';
  loading.classList.add('show');

  try {
    const result = await window.electronAPI.login({ url, username, password });
    
    if (result.success) {
      // Login successful - main window will open
      console.log('Login successful');
    } else {
      showError(result.error || 'Login failed. Please check your credentials.');
      loginBtn.disabled = false;
      loginBtn.textContent = 'Sign In';
      loading.classList.remove('show');
    }
  } catch (error) {
    showError('Connection error. Please check your internet connection and try again.');
    loginBtn.disabled = false;
    loginBtn.textContent = 'Sign In';
    loading.classList.remove('show');
  }
});

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.add('show');
}

// Handle Enter key
document.getElementById('password').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    form.dispatchEvent(new Event('submit'));
  }
});
