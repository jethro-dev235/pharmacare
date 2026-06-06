const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtenir toutes les ventes
const getVentes = async (req, res) => {
  try {
    const ventes = await prisma.vente.findMany({
      include: { client: true, user: true, items: { include: { medicament: true } } },
      orderBy: { dateVente: 'desc' }
    });
    res.json(ventes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Créer une vente
const createVente = async (req, res) => {
  try {
    const { clientId, items } = req.body;
    const userId = req.user.id;

    // Calculer le montant total
    let montant = 0;
    for (const item of items) {
      montant += item.prixUnitaire * item.quantite;
    }

    // Générer numéro de facture
    const numero = `FAC-${Date.now()}`;

    const vente = await prisma.vente.create({
      data: {
        numero,
        montant,
        clientId: clientId ? parseInt(clientId) : null,
        userId,
        items: {
          create: items.map(item => ({
            quantite: item.quantite,
            prixUnitaire: item.prixUnitaire,
            medicamentId: parseInt(item.medicamentId)
          }))
        }
      },
      include: { items: true, client: true }
    });

    // Mettre à jour les stocks
    for (const item of items) {
      await prisma.medicament.update({
        where: { id: parseInt(item.medicamentId) },
        data: { quantite: { decrement: item.quantite } }
      });
    }

    res.status(201).json(vente);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Statistiques dashboard
const getStats = async (req, res) => {
  try {
    const totalMedicaments = await prisma.medicament.count();
    const totalVentes = await prisma.vente.count();
    const chiffreAffaires = await prisma.vente.aggregate({ _sum: { montant: true } });

    res.json({
      totalMedicaments,
      totalVentes,
      chiffreAffaires: chiffreAffaires._sum.montant || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { getVentes, createVente, getStats };