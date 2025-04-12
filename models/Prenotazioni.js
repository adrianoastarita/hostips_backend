const mongoose = require('mongoose');

const prenotazioni_schema = new mongoose.Schema({
    bookingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    partnerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true },
    data: { type: Date, required: true },
    coperti: {type: Number, required: true}
});

module.exports = mongoose.model('Partner', partner_schema, 'partner');
