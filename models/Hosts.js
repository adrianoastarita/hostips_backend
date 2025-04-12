// backend/models/Hosts.js

const mongoose = require('mongoose');

const host_schema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
});

const Host = mongoose.model('Host', host_schema, 'hosts');

module.exports = Host;
