const express = require('express');
const router = express.Router();
const ProductControllers = require('../controllers/ProductControllers');
const { authMiddleware } = require('../middleware/authmiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products'); // Thư mục lưu trữ avatar
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), ProductControllers.create);
router.put('/update/:id', authMiddleware, upload.single('image'), ProductControllers.update);
router.get('/details/:id', ProductControllers.getDetails);
router.delete('/delete/:id', authMiddleware, ProductControllers.deleteProduct);
router.delete('/delete-many', authMiddleware, ProductControllers.deleteMany);
router.get('/getAllProduct', ProductControllers.getAllProduct);
router.get('/searchProduct', ProductControllers.searchProduct);
router.get('/type-all-product', ProductControllers.getAllType);
router.get('/page-type-product', ProductControllers.pageTypeProduct);

module.exports = router;
