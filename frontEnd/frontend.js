const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

const viewsPath = path.join(__dirname, './public/');
app.set('views', viewsPath);

app.get('/', (req, res, next) => {
  res.render('views/index');
  console.log('S-a incarcat cu success');
});

app.listen(3000);
