const express = require('express');
const router = express.Router();
const { getVentes, createVente, getStats } = require('../controllers/venteController');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, getVentes);
router.post('/', verifyToken, createVente);
router.get('/stats', verifyToken, getStats);

module.exports = router;