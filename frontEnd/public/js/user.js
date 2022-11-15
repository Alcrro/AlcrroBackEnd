const registerNameValue = document.querySelector('.registerName');
const registerEmailValue = document.querySelector('.registerEmail');
const registerPasswordValue = document.querySelector('.registerPassword');
const registerErrorValue = document.querySelector('.registerError');
const registerErrorNameValue = document.querySelector(
  '.registerErrorEmptyName'
);
const registerSuccessValue = document.querySelector('.registerSuccess');
const registerSubmit = document.querySelector('.btn-register');

const registerForm = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: registerNameValue.value,
        email: registerEmailValue.value,
        password: registerPasswordValue.value,
      }),
    });
    const data = await res.json();
    if (registerNameValue.value === '') {
      registerErrorNameValue.classList.remove('hide');
      return;
    }
    if (data.name === registerErrorNameValue.value) {
      registerErrorValue.classList.remove('hide');
      console.log('Acest nume exista');
    } else {
      registerErrorValue.classList.add('hide');
      registerErrorNameValue.classList.add('hide');
      registerSuccessValue.classList.remove('hide');
    }

    console.log(data.message);
  } catch (error) {
    console.log(error);
  }
};

registerSubmit.addEventListener('click', registerForm);

const loginEmailValue = document.querySelector('.email');
const loginPasswordValue = document.querySelector('.password');
const loginSubmit = document.querySelector('.btn-login');

const liBunVenit = document.querySelector('.li-container-bunvenit');
const registerBtnA = document.querySelector('.li-container-register');
const loginBtnA = document.querySelector('.li-container-login');
const logOutBtnA = document.querySelector('.li-container-logout');
const loginFormContainer = document.querySelector('.form-container-login');

const loginForm = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: loginEmailValue.value,
        password: loginPasswordValue.value,
      }),
    });
    const data = await res.json();
    const dataR = data;
    console.log(dataR.data.name);
    liBunVenit.classList.remove('hide-bunvenit-container');
    logOutBtnA.classList.remove('hide-logoutBtn-container');
    const username = `<a href="">Bun Venit: ${dataR.data.name}</a>`;

    liBunVenit.innerHTML = username;
    loginFormContainer.classList.add('hide-login-form');
    registerBtnA.style.display = 'none';
    loginBtnA.style.display = 'none';
  } catch (error) {
    console.log(error);
  }
};

loginSubmit.addEventListener('click', loginForm);
