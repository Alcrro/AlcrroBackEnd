//Login user
const formContainer = document.querySelector('.form-container-login');
const messageEl = document.querySelector('.login-message');
const checkboxEl = document.querySelector('.form-check-input');

const logInUser = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData(formContainer);
    const data = Object.fromEntries(formData);

    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const dataObject = await res.json();
    const dataArray = dataObject.data;
    console.log(dataObject);

    //Check if is logged in
    if (dataObject.cookies.expires < Date.now()) {
      const aBunVenitEl = document.querySelector('.js-nav-link-bv');
      const registerLink = document.querySelector('.js-nav-link-register');
      const loginLink = document.querySelector('.js-nav-link-logout');
      registerLink.classList.add('d-none');
      loginLink.classList.add('d-none');
      aBunVenitEl.classList.remove('d-none');
      const containerBunVenitSpanEl = document.querySelector('.span-username');
      const data = `${dataArray.name}`;

      containerBunVenitSpanEl.innerHTML = data;
    } else {
      console.log('Trebe sa te loghezi');
    }

    function invalidCredentials() {
      const data = `<p class="message-group registerErrorEmptyName">${dataObject.message}</p>`;

      messageEl.innerHTML = data;
      messageEl.style.color = 'red';
    }
    function hideText() {
      messageEl.textContent = '';
    }

    function registerSuccess() {
      const data = `<p class="message-group registerSuccess">${dataObject.message}</p>`;
      messageEl.innerHTML = data;
      messageEl.style.color = 'green';
    }

    //Check if input are not empty
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
      const aBunVenitEl = document.querySelector('.js-nav-link-bv');
      const registerLink = document.querySelector('.js-nav-link-register');
      const loginLink = document.querySelector('.js-nav-link-logout');
      registerLink.classList.add('d-none');
      loginLink.classList.add('d-none');
      aBunVenitEl.classList.remove('d-none');
      const containerBunVenitSpanEl = document.querySelector('.span-username');
      const data = `${dataArray.name}`;

      containerBunVenitSpanEl.innerHTML = data;
      location.href;

      const setToken = sessionStorage.setItem('token', JSON.stringify(dataObject.cookies.token));
    }
  } catch (error) {
    console.log(error);
  }
};

formContainer.addEventListener('submit', logInUser);

const getToken = sessionStorage.getItem('token');
const valueToken = JSON.parse(getToken);

function parseJwt(valueToken) {
  const base64Url = valueToken.split('.')[1];
  let base64 = decodeURIComponent(
    atob(base64Url)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(base64);
}
parseJwt(valueToken);
