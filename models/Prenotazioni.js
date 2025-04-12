const mongoose = require('mongoose');

const prenotazioni_schema = new mongoose.Schema({
    bookingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    partnerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true },
    DataView: { type: Date, required: true },
    coperti: {type: Number, required: true}
});

module.exports = mongoose.model('Prenotazioni', prenotazioni_schema, 'prenotazioni');
