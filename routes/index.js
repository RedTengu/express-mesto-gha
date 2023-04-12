const router = require('express').Router();

const usersRouter = require('./users')
const cardsRouter = require('./cards')

router.use('/users', usersRouter);
router.cards('/cards', cardsRouter);

module.exports = router;