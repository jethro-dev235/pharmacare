const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtenir tous les fournisseurs
const getFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await prisma.fournisseur.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(fournisseurs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Créer un fournisseur
const createFournisseur = async (req, res) => {
  try {
    const { nom, telephone, adresse, email } = req.body;
    const fournisseur = await prisma.fournisseur.create({
      data: { nom, telephone, adresse, email }
    });
    res.status(201).json(fournisseur);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Modifier un fournisseur
const updateFournisseur = async (req, res) => {
  try {
    const { id } = req.params;
    const fournisseur = await prisma.fournisseur.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(fournisseur);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Supprimer un fournisseur
const deleteFournisseur = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.fournisseur.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Fournisseur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { getFournisseurs, createFournisseur, updateFournisseur, deleteFournisseur };