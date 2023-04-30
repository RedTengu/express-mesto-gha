const Card = require('../models/card');

const Forbidden = require('../errors/forbiddenError');

module.exports = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById({ _id: cardId })
    .then((card) => {
      if (card.owner !== req.user._id) {
        throw new Forbidden('Чужие карточки удалять нельзя!');
      }
      return next();
    })
    .catch(next);
};