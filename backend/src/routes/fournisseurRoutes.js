const express = require('express');
const router = express.Router();
const { getFournisseurs, createFournisseur, updateFournisseur, deleteFournisseur } = require('../controllers/fournisseurController');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, getFournisseurs);
router.post('/', verifyToken, createFournisseur);
router.put('/:id', verifyToken, updateFournisseur);
router.delete('/:id', verifyToken, deleteFournisseur);

module.exports = router;