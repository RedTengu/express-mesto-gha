const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { ERROR_400, ERROR_404, ERROR_500 } = require('../errors/errors');

const userCheck = (user, res) => {
  if (user) {
    return res.send(user);
  }
  return res.status(ERROR_404).send({ message: 'Пользователь по указанному _id не найден.' });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_500).send({ message: 'Произошла ошибка!' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => userCheck(user, res))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_400).send({
          message: 'Некорректный _id.',
        });
      }
      return res.status(ERROR_500).send({ message: 'Произошла ошибка!' });
    });
};

const createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name, about, avatar })
        .then((newUser) => res.send(newUser))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return res.status(ERROR_400).send({
              message: 'Переданы некорректные данные при создании пользователя.',
            });
          }
          return res.status(ERROR_500).send({ message: 'Произошла ошибка!' });
        });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.send('Ошибка! Неверный email или пароль.') // Выбросить централизованную ошибку
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            res.send('Ошибка! Неверный email или пароль.') // Выбросить централизованную ошибку
          }

          const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });

          return res.send({ token });
        })
        .catch((err) => res.status(401).send({ message: err.message }));
    })
}

const editUser = (req, res) => {
  const { name, about } = req.body;
  const ownerId = req.user._id;

  User.findByIdAndUpdate(ownerId, { name, about }, { new: true, runValidators: true })
    .then((user) => userCheck(user, res))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
      }
      return res.status(ERROR_500).send({ message: 'Произошла ошибка!' });
    });
};

const editAvatar = (req, res) => {
  const avatar = req.body;
  const ownerId = req.user._id;

  User.findByIdAndUpdate(ownerId, avatar, { new: true, runValidators: true })
    .then((user) => userCheck(user, res))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_400).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      }
      return res.status(ERROR_500).send({ message: 'Произошла ошибка!' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
  editUser,
  editAvatar,
};
