const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtenir tous les mouvements de stock
const getStocks = async (req, res) => {
  try {
    const stocks = await prisma.stock.findMany({
      include: { medicament: true },
      orderBy: { date: 'desc' }
    });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Ajouter un mouvement de stock
const addStock = async (req, res) => {
  try {
    const { type, quantite, motif, medicamentId } = req.body;

    const stock = await prisma.stock.create({
      data: { type, quantite, motif, medicamentId: parseInt(medicamentId) }
    });

    // Mettre à jour la quantité du médicament
    const medicament = await prisma.medicament.findUnique({
      where: { id: parseInt(medicamentId) }
    });

    let nouvelleQuantite = medicament.quantite;
    if (type === 'entree') nouvelleQuantite += quantite;
    else if (type === 'sortie') nouvelleQuantite -= quantite;
    else if (type === 'ajustement') nouvelleQuantite = quantite;

    await prisma.medicament.update({
      where: { id: parseInt(medicamentId) },
      data: { quantite: nouvelleQuantite }
    });

    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Alertes stock
const getAlertes = async (req, res) => {
  try {
    const aujourd_hui = new Date();
    const dans30jours = new Date();
    dans30jours.setDate(dans30jours.getDate() + 30);

    const stockFaible = await prisma.medicament.findMany({
      where: { quantite: { lte: 10, gt: 0 } }
    });

    const rupture = await prisma.medicament.findMany({
      where: { quantite: { lte: 0 } }
    });

    const expires = await prisma.medicament.findMany({
      where: { dateExpiration: { lt: aujourd_hui } }
    });

    const prochesExpiration = await prisma.medicament.findMany({
      where: { dateExpiration: { gte: aujourd_hui, lte: dans30jours } }
    });

    res.json({ stockFaible, rupture, expires, prochesExpiration });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { getStocks, addStock, getAlertes };