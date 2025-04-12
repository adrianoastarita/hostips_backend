// backend/models/Zone.js

const mongoose = require('mongoose');

const zone_schema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
});

const Zone = mongoose.model('Zone', zone_schema, 'zone');

module.exports = Zone;
