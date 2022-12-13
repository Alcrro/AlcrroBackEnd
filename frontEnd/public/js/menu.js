// const alreadyloggedIn = async (e) => {
//   const navbar = document.querySelector('.navbar');
//   e.preventDefault();

//   const res = await fetch('http://localhost:5000/api/auth/me', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(navbar),
//   });

//   const results = await res.json();
//   console.log(results);
// };
// window.addEventListener('DOMContentLoaded', alreadyloggedIn);

//Login user
const formContainer = document.querySelector('.menu-container');
const messageEl = document.querySelector('.login-message');
const checkboxEl = document.querySelector('.form-check-input');

const alreadyloggedIn = async (e) => {
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
    console.log(dataArray);
  } catch (error) {
    console.log(error);
  }
};

formContainer.addEventListener('DOMContentLoaded', alreadyloggedIn);
