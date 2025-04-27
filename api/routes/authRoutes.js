// src/routes/authRoutes.js
import express from 'express';
import register from '../controllers/registerController.js';
// import { login } from '../controllers/loginController.js';
import logout from '../controllers/logoutController.js';
import fetchUserInfo from '../Controllers/fetchUserInfo.js';
import updateUserInfo from '../Controllers/updateUserInfo.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/register', register);
router.post('/logout', logout);
router.get('/userInfo', authMiddleware, fetchUserInfo);
router.put('/userInfo/update', authMiddleware, updateUserInfo);
// router.post('/login', login);
// router.put('/userInfo/update', authMiddleware, updateUserInfo);
// router.delete('/userInfo/deleteAccount', authMiddleware, deleteAccount);

export default router;
