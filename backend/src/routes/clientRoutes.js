const express = require('express');
const router = express.Router();
const { getClients, createClient, updateClient, deleteClient, getClientHistorique } = require('../controllers/clientController');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, getClients);
router.post('/', verifyToken, createClient);
router.put('/:id', verifyToken, updateClient);
router.delete('/:id', verifyToken, deleteClient);
router.get('/:id/historique', verifyToken, getClientHistorique);

module.exports = router;