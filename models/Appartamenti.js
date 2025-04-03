// backend/models/Appartamenti.js

const mongoose = require('mongoose');

// Definizione del modello per la collection apt_list
const appartamento_schema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  indirizzo: { type: String, required: true },
  coord: { type: [Number], required: true},
  zonaID: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
  hostID: { type: mongoose.Schema.Types.ObjectId, ref: 'Hosts', required: true }

});

const Appartamenti = mongoose.model('Appartamenti', appartamento_schema, 'appartamenti');

module.exports = Appartamenti;
