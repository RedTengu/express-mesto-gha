const User = require('../models/user');

const { ERROR_400, ERROR_404, ERROR_500 } = require('../errors/errors');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(ERROR_500).send({ message: 'Произошла ошибка!' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then(user => res.send(user))
    .catch(err => {
      if (err.name === 'CastError') {
        return res.status(ERROR_404).send({
          message: 'Пользователь по указанному _id не найден.',
        });
      }
      return res.status(ERROR_500).send({ message: 'Произошла ошибка!' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(newUser => res.send(newUser))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      }
      return res.status(ERROR_500).send({ message: 'Произошла ошибка!' });
    });
};

const editUser = (req, res) => {
  const { name, about } = req.body;
  const ownerId = req.user._id;

  User.findByIdAndUpdate(ownerId, { name, about }, { new: true, runValidators: true })
    .then(user => res.send(user))
    .catch(err => {
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
    .then(user => res.send(user))
    .catch(err => {
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
  editUser,
  editAvatar
};