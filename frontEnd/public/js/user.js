const registerNameValue = document.querySelector('.registerName');
const registerEmailValue = document.querySelector('.registerEmail');
const registerPasswordValue = document.querySelector('.registerPassword');
const registerErrorValue = document.querySelector('.registerError');
const registerErrorNameValue = document.querySelector('.registerErrorEmptyName');
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
      message.style.color = 'red';
    }
    function duplicateFields() {
      const data = `<p class="message-group registerErrorEmptyName">${dataResult.message}</p>`;
      message.innerHTML = data;
      message.style.color = 'red';
    }
    function registerSuccess() {
      const data = `<p class="message-group registerSuccess">${dataResult.message}</p>`;
      message.innerHTML = data;
      message.style.color = 'green';
    }

    function hideText() {
      message.textContent = '';
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

const formContainer = document.querySelector('.form-container-login');
const messageEl = document.querySelector('.login-message');
const checkboxEl = document.querySelector('.form-check-input');

const test = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData(formContainer);
    const data = Object.fromEntries(formData);

    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const dataR = await res.json();
    console.log(dataR);

    function invalidCredentials() {
      const data = `<p class="message-group registerErrorEmptyName">${dataR.message}</p>`;

      messageEl.innerHTML = data;
      messageEl.style.color = 'red';
    }
    function hideText() {
      messageEl.textContent = '';
    }

    function registerSuccess() {
      const data = `<p class="message-group registerSuccess">${dataR.message}</p>`;
      messageEl.innerHTML = data;
      messageEl.style.color = 'green';
    }

    if (data.email === '' || data.password === '' || data.checkbox !== 'on') {
      invalidCredentials();
      setTimeout(() => {
        hideText();
      }, 3000);
      return;
    } else {
      registerSuccess();
      setTimeout(() => {
        hideText();
      }, 3000);
      checkboxEl.checked = false;

      localStorage.setItem('dataSession', JSON.stringify(dataR.loginSession));

      const aBunVenitEl = document.querySelector('.js-nav-link-bv');
      aBunVenitEl.classList.remove('d-none');
      const containerBunVenitSpanEl = document.querySelector('.span-username');
      const data = `${dataR.data.name}`;

      containerBunVenitSpanEl.innerHTML = data;
      console.log(document.querySelector('.span-username').textContent);
    }
  } catch (error) {
    console.log(error);
  }
};

formContainer.addEventListener('submit', test);

const logoutBtn = document.querySelector('.js-nav-link-logout');

const logout = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData(formContainer);
    const data = Object.fromEntries(formData);

    const res = await fetch('http://localhost:5000/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const dataResultSessions = await res.json();
    console.log(dataResultSessions);
    console.log(dataResultSessions.data.name);
    console.log('mere boss');
    const spanUsername = document.querySelector('.span-username');
    console.log(spanUsername.textContent);
    if (spanUsername.textContent === dataResultSessions.data.name) {
      console.log('este');
    } else {
      console.log('nu este');
    }
  } catch (error) {
    console.log(error);
  }
};

logoutBtn.addEventListener('click', logout);
