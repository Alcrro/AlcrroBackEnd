const registerNameValue = document.querySelector('.registerName');
const registerEmailValue = document.querySelector('.registerEmail');
const registerPasswordValue = document.querySelector('.registerPassword');
const registerErrorValue = document.querySelector('.registerError');
const registerErrorNameValue = document.querySelector(
  '.registerErrorEmptyName'
);
const registerSuccessValue = document.querySelector('.registerSuccess');
const registerSubmit = document.querySelector('.btn-register');
const message = document.querySelector('.message');
const loginMessage = document.querySelector('.login-message');

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
    const dataResult = data;
    console.log(dataResult);
    function emptyFields() {
      const data = `<p class="message-group registerError">${dataResult.message}</p>`;

      message.innerHTML = data;
    }
    function duplicateFields() {
      const data = `<p class="message-group registerErrorEmptyName">${dataResult.message}</p>`;
      message.innerHTML = data;
    }
    function registerSuccess() {
      const data = `<p class="message-group registerSuccess">${dataResult.message}</p>`;
      message.innerHTML = data;
    }

    console.log(dataResult);
    if (registerNameValue.value === '') {
      emptyFields();
      setTimeout(() => {
        hideText();
      }, 3000);
      return;
    } else if (dataResult.message == 'Duplicate field value entered') {
      duplicateFields();
      setTimeout(() => {
        hideText();
      }, 3000);
      return;
    } else {
      registerSuccess();
      setTimeout(() => {
        hideText();
      }, 3000);
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
    function invalidCredentials() {
      const data = `<p class="message-group registerErrorEmptyName">${dataR.message}</p>`;
      loginMessage.innerHTML = data;
    }
    function hideText() {
      loginMessage.textContent = '';
      loginMessage.style.color = 'red';
    }

    if (dataR.message === 'Invalid credentials') {
      console.log(dataR.message);
      invalidCredentials();
      setTimeout(() => {
        hideText();
      }, 3000);
      return;
    } else {
      liBunVenit.classList.remove('hide-bunvenit-container');
      logOutBtnA.classList.remove('hide-logoutBtn-container');
      const username = `<a href="#">Bun Venit: ${dataR.data.name}</a>`;

      liBunVenit.innerHTML = username;
      loginFormContainer.classList.add('hide-login-form');
      registerBtnA.style.display = 'none';
      loginBtnA.style.display = 'none';
    }
  } catch (err) {
    console.log(err);
  }
};

loginSubmit.addEventListener('click', loginForm);
