const userRouter = require('express').Router();
const userController = require('../controllers/user/index.controller');
const { authUser } = require('../middlewares/security/index.middleware');
const { userExists } = require('../middlewares/user/index.middleware');

userRouter.post('/register', userController.register);
userRouter.get('/validate/:registrationCode', userController.validate);
userRouter.post('/login', userController.login);
userRouter.get('/profile', authUser, userExists, userController.profile);
userRouter.get('/profile/:userId', userExists, userController.publicProfile);
userRouter.put('/avatar', authUser, userExists, userController.editAvatar);

module.exports = userRouter;
