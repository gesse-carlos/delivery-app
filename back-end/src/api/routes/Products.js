const { Router } = require('express');

const productsController = require('../controllers/Products');

const router = Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

module.exports = router;