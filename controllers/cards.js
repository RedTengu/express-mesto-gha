const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link, owner, likes, createdAt} = req.body;

  Card.create({ name, link, owner, likes, createdAt })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err.message);
    })
};

module.exports = {
  createCard
};