const express = require('express');
const router = express.Router();
const ProductControllers = require('../controllers/ProductControllers');
const { authMiddleware } = require('../middleware/authmiddleware');

router.post('/create', ProductControllers.create);
router.put('/update/:id', authMiddleware, ProductControllers.update);
router.get('/details/:id', ProductControllers.getDetails);
router.delete('/delete/:id', ProductControllers.deleteProduct);

module.exports = router;
