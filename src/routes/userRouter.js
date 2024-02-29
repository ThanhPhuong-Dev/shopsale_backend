const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserControllers = require('../controllers/UserControllers');
const { authMiddleware, authUserMiddleware } = require('../middleware/authmiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/avatars'); // Thư mục lưu trữ avatar
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Tên tệp tin được lưu trữ
  }
});

const upload = multer({ storage: storage });

router.post('/register', UserControllers.register);
router.post('/login', UserControllers.login);
router.post('/log-out', UserControllers.logoutUser);
router.put('/update/:id', upload.single('avatar'), UserControllers.updateUser);
router.put('/load-coin/:id', authUserMiddleware, UserControllers.LoadCoin);
router.delete('/delete/:id', authMiddleware, UserControllers.deleteUser);
router.get('/getAllUser', authMiddleware, UserControllers.getAllUser);
router.get('/get-details/:id', authUserMiddleware, UserControllers.getDetailsUser);
router.post('/refresh-token', UserControllers.refreshToken);

module.exports = router;
