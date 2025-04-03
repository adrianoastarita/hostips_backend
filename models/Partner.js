const mongoose = require('mongoose');

const partner_schema = new mongoose.Schema({
    nome: {type: String, required: true },
    indirizzo: {type: String, required: true },
    coord: { type: [Number], required: true},
    catID: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie', required: true },
    zonaID: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
    promozione: {type: Number, required: true}
});

module.exports = mongoose.model('Partner', partner_schema, 'partner');
