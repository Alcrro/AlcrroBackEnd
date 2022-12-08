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
