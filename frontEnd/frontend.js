const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

const viewsPath = path.join(__dirname, './public/views');
app.set('views', viewsPath);

app.get('/', (req, res, next) => {
  res.render('views/index', {
    pageTitle: 'ALCRRO.RO',
  });
});

app.listen(3000);
