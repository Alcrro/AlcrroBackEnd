const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './frontend/public')));

const viewsPath = path.join(__dirname, './frontend/public/views');
app.set('views', viewsPath);

app.get('/', (req, res, next) => {
  res.render('index/index', {
    pageTitle: 'ALCRRO.RO',
  });
});
app.get('/register', (req, res, next) => {
  res.render('auth/regform', {
    pageTitle: 'ALCRRO.RO - Register',
  });
});
app.get('/login', (req, res, next) => {
  res.render('auth/authform', {
    pageTitle: 'ALCRRO.RO - Login',
  });
});

app.listen(3000);
