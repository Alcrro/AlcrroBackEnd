const registerBtn = document.querySelector('.a-container-register');
const registerContainer = document.querySelector('.form-container-register');
const mainContainer = document.querySelector('.main-container');

const loginBtn = document.querySelector('.a-container-login');
const loginContainer = document.querySelector('.form-container-login');

registerBtn.addEventListener('click', function () {
  loginContainer.classList.add('hide-login-form');
  loginContainer.classList.add('hide-main-container-auth');
  registerContainer.classList.toggle('hide-register-form');
});
loginBtn.addEventListener('click', function () {
  registerContainer.classList.add('hide-register-form');
  loginContainer.classList.toggle('hide-login-form');
});
