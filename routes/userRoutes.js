import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();
import userController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

// route level middlwares
router.use('/changepassword',checkUserAuth);

// these are public routes

router.post('/register',userController.userRegistration);
router.post('/login',userController.userLogin);


// these are private routes


router.post('/changepassword',UserController.changeUserPassword);

export default router;

