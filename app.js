const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./routes');
const { ERROR_404 } = require('./errors/errors');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(router);

app.use((req, res) => {
  res.status(ERROR_404).send({
    message: 'Маршрут не существует!',
  });
});

app.listen(PORT, () => {
  console.log('Я запущен!');
});
