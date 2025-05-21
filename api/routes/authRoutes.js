// src/routes/authRoutes.js
import express from 'express';
import register from '../controllers/registerController.js';
import login from '../controllers/loginController.js';
import logout from '../controllers/logoutController.js';
import fetchUserInfo from '../Controllers/fetchUserInfo.js';
import updateUserInfo from '../Controllers/updateUserInfo.js';
import authMiddleware from '../middleware/authMiddleware.js';
import deleteUser from '../Controllers/deleteUsers.js';
import addMed from '../Controllers/addMed.js';
import fetchUsersMeds from '../Controllers/fetchUsersMeds.js';
import deleteMed from '../Controllers/deleteMed.js';
import updateMed from '../Controllers/updateMed.js';
// import getUsersMeds from '../Controllers/getUsersMeds.js';
import getMeds from '../Controllers/getMeds.js';

const router = express.Router();
router.post('/register', register);
router.post('/logout', logout);
router.get('/userInfo', authMiddleware, fetchUserInfo);
router.put('/userInfo/update', authMiddleware, updateUserInfo);
router.post('/login', login);
router.delete('/deleteAccount', authMiddleware, deleteUser);
router.post('/addMed', authMiddleware, addMed);
router.get('/fetchUsersMeds', authMiddleware, fetchUsersMeds);
router.delete('/deleteMed', authMiddleware, deleteMed);
router.put('/updateMed', authMiddleware, updateMed);
router.get('/getMeds', getMeds);

export default router;
