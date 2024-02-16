const express = require('express');
const router = express.Router();
const ProductControllers = require('../controllers/ProductControllers');
const { authMiddleware } = require('../middleware/authmiddleware');

router.post('/create', ProductControllers.create);
router.put('/update/:id', authMiddleware, ProductControllers.update);
router.get('/details/:id', ProductControllers.getDetails);
router.delete('/delete/:id', authMiddleware, ProductControllers.deleteProduct);
router.delete('/delete-many', authMiddleware, ProductControllers.deleteMany);
router.get('/getAllProduct', ProductControllers.getAllProduct);
router.get('/searchProduct', ProductControllers.searchProduct);

module.exports = router;
