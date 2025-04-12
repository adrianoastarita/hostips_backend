// backend/models/Coupons.js

const mongoose = require('mongoose');

// Definizione del modello per la collection guest_login
const coupon_schema = new mongoose.Schema({
    bookingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    partnerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true },
    codice: { type: String, required: true },
});

const Coupon = mongoose.model('Coupon', coupon_schema, 'coupon');

module.exports = Coupon;
