const cardsRouter = require('express').Router();

const { createCard } = require('../controllers/cards');

cardsRouter.post('/', createCard);

module.exports = cardsRouter;