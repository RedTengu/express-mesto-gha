const usersRouter = require('express').Router();

const {
  getCurrentUser, getUsers, getUserById, createUser, editUser, editAvatar,
} = require('../controllers/users');

usersRouter.get('/me', getCurrentUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', editUser);
usersRouter.patch('/me/avatar', editAvatar);

module.exports = usersRouter;
