const emailValue = document.querySelector('.email');
const passwordValue = document.querySelector('.password');
const submit = document.querySelector('.btn-login');

const clickHandler = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailValue.value,
        password: passwordValue.value,
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

submit.addEventListener('click', clickHandler);
