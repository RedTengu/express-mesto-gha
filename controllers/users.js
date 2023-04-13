const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err.message);
    })
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err.message);
    })
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err.message);
    })
};

module.exports = {
  getUsers,
  getUserById,
  createUser
};