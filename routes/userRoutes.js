import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();
import userController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

// route level middlwares
router.use('/changepassword',checkUserAuth);
// router.use('/loggeduser',checkUserAuth);

// these are public routes

router.post('/register',userController.userRegistration);
router.post('/login',userController.userLogin);
router.post('/send-reset-password-email',userController.sendUserPasswordResetEmail);
router.post('/reset-password/:id/:token',userController.userPasswordReset);


// these are private routes


router.post('/changepassword',UserController.changeUserPassword);
router.get('/loggeduser', checkUserAuth , UserController.loggedUser);

export default router;

