const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err.message));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then(user => res.send(user))
    .catch(err => res.status(400).send(err.message));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(newUser => res.send(newUser))
    .catch(err => res.status(400).send(err.message));
};

const editUser = (req, res) => {
  const { name, about } = req.body;
  const ownerId = req.user._id;

  User.findByIdAndUpdate(ownerId, { name, about }, { new: true, runValidators: true })
    .then(user => res.send(user))
    .catch(err => res.status(400).send(err.message));
};

const editAvatar = (req, res) => {
  const avatar = req.body;
  const ownerId = req.user._id;

  User.findByIdAndUpdate(ownerId, avatar, { new: true, runValidators: true })
    .then(user => res.send(user))
    .catch(err => res.status(400).send(err.message));
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  editUser,
  editAvatar
};