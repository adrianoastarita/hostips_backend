const mongoose = require('mongoose');

const categorie_schema = new mongoose.Schema({
  nome: { type: String, required: true }
});

module.exports = mongoose.model('Categorie', categorie_schema, 'categorie');
