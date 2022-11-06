const test = document.querySelector('.test');
for (i = 0; i < 10; i++) {
  const test2 = `<h1>${i}</h1>`;

  test.innerHTML += test2;
}
