const User = require('../models/user');

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
  createUser
};