const express = require('express');
const router = express.Router();
const { getMedicaments, getMedicament, createMedicament, updateMedicament, deleteMedicament } = require('../controllers/medicamentController');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, getMedicaments);
router.get('/:id', verifyToken, getMedicament);
router.post('/', verifyToken, createMedicament);
router.put('/:id', verifyToken, updateMedicament);
router.delete('/:id', verifyToken, deleteMedicament);

module.exports = router;