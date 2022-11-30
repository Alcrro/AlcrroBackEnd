const alreadyloggedIn = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const results = await res.json();
    console.log(results);
  } catch (error) {}
};
formContainer.addEventListener('DOMContentLoaded', logInUser);
