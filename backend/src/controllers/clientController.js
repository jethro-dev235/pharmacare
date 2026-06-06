const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtenir tous les clients
const getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: { ventes: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Créer un client
const createClient = async (req, res) => {
  try {
    const { nom, telephone, email, adresse } = req.body;
    const client = await prisma.client.create({
      data: { nom, telephone, email, adresse }
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Modifier un client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Supprimer un client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.client.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Client supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Historique achats d'un client
const getClientHistorique = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) },
      include: { ventes: { include: { items: { include: { medicament: true } } } } }
    });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { getClients, createClient, updateClient, deleteClient, getClientHistorique };