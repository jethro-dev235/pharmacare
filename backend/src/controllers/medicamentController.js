const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtenir tous les médicaments
const getMedicaments = async (req, res) => {
  try {
    const medicaments = await prisma.medicament.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(medicaments);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Obtenir un médicament
const getMedicament = async (req, res) => {
  try {
    const { id } = req.params;
    const medicament = await prisma.medicament.findUnique({
      where: { id: parseInt(id) }
    });
    if (!medicament) return res.status(404).json({ message: 'Médicament non trouvé.' });
    res.json(medicament);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Créer un médicament
const createMedicament = async (req, res) => {
  try {
    const { nom, categorie, description, prixAchat, prixVente, quantite, dateExpiration, codeBarres, fabricant } = req.body;
    const medicament = await prisma.medicament.create({
      data: { nom, categorie, description, prixAchat, prixVente, quantite, dateExpiration: new Date(dateExpiration), codeBarres, fabricant }
    });
    res.status(201).json(medicament);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Modifier un médicament
const updateMedicament = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.dateExpiration) data.dateExpiration = new Date(data.dateExpiration);
    const medicament = await prisma.medicament.update({
      where: { id: parseInt(id) },
      data
    });
    res.json(medicament);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Supprimer un médicament
const deleteMedicament = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.medicament.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Médicament supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { getMedicaments, getMedicament, createMedicament, updateMedicament, deleteMedicament };