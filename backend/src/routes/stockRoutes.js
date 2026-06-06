const express = require('express');
const router = express.Router();
const { getStocks, addStock, getAlertes } = require('../controllers/stockController');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, getStocks);
router.post('/', verifyToken, addStock);
router.get('/alertes', verifyToken, getAlertes);

module.exports = router;