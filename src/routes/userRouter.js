const express = require('express');
const router = express.Router();

const UserControllers = require('../controllers/UserControllers');
const { authMiddleware, authUserMiddleware } = require('../middleware/authmiddleware');

router.post('/register', UserControllers.register);
router.post('/login', UserControllers.login);
router.post('/log-out', UserControllers.logoutUser);
router.put('/update/:id', UserControllers.updateUser);
router.delete('/delete/:id', authMiddleware, UserControllers.deleteUser);
router.get('/getAllUser', authMiddleware, UserControllers.getAllUser);
router.get('/get-details/:id', authUserMiddleware, UserControllers.getDetailsUser);
router.post('/refresh-token', UserControllers.refreshToken);

module.exports = router;
