const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/medicaments', require('./routes/medicamentRoutes'));
app.use('/api/stocks', require('./routes/stockRoutes'));
app.use('/api/ventes', require('./routes/venteRoutes'));
app.use('/api/fournisseurs', require('./routes/fournisseurRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));

// Route test
app.get('/', (req, res) => {
  res.json({ message: 'PharmaCare API is running !' });
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;