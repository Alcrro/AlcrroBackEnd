const registerBtn = document.querySelector('.a-container-register');
const registerContainer = document.querySelector('.form-container-register');

const loginBtn = document.querySelector('.a-container-login');
const loginContainer = document.querySelector('.form-container-login');

registerBtn.addEventListener('click', function () {
  loginContainer.classList.add('hide-login-form');
  registerContainer.classList.toggle('hide-register-form');
});
loginBtn.addEventListener('click', function () {
  registerContainer.classList.add('hide-register-form');
  loginContainer.classList.toggle('hide-login-form');
});
