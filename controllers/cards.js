const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then(cards => {
      res.send(cards);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err.message);
    })
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then(newCard => {
      res.send(newCard);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err.message);
    })
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then(card => {
      res.send(card);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err.message);
    })
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => {
      res.send(card);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err.message);
    })
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerId } }, { new: true })
    .then(card => {
      res.send(card);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err.message);
    })
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};