import express from 'express';

const router = express.Router();
import userController from '../controllers/userController.js';



router.post('/register',userController.userRegistration);
router.post('/login',userController.userLogin);


export default router;

