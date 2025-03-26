// server.js

// Importo i moduli necessari
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login_routes');
const aptRoutes = require('./routes/apt_routes');
const path = require('path');  // Per gestire i percorsi dei file

// Carico le variabili di ambiente
dotenv.config();

// Creo una nuova app Express
const app = express();

// Middleware
app.use(cors()); // Abilita CORS per consentire richieste dal frontend
app.use(bodyParser.json()); // Consente di fare il parsing delle richieste JSON

// Servire i file statici dalla cartella 'src/db_partner'
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Connessione a MongoDB
const connectDB = async () => {
  try {
    // Rimuovi le opzioni deprecated
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connesso a MongoDB');
  } catch (error) {
    console.error('Errore di connessione a MongoDB:', error.message);
    process.exit(1); // Termina il processo in caso di errore
  }
};

// Connessione al database
connectDB();

// Aggiungiamo le rotte per la gestione del login
app.use('/api', loginRoutes);  // Nuovo nome del file delle rotte

// Aggiungiamo le rotte per la gestione dei dati degli appartamenti
app.use('/api', aptRoutes);  // Nuovo nome del file delle rotte

// Configurazione della porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
