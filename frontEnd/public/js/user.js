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
    console.log(dataObject.token.isLoggedIn);

    sessionStorage.setItem('token', JSON.stringify(dataObject.token));

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

      //Check if is logged in
      if (dataObject.token.isLoggedIn === true) {
        const aBunVenitEl = document.querySelector('.js-nav-link-bv');
        aBunVenitEl.classList.remove('d-none');
        const containerBunVenitSpanEl = document.querySelector('.span-username');
        const data = `${dataArray.name}`;
        console.log(data);

        containerBunVenitSpanEl.innerHTML = data;
        console.log(document.querySelector('.span-username').textContent);
      } else {
        console.log('Trebe sa te loghezi');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

formContainer.addEventListener('submit', logInUser);
