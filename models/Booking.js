// backend/models/Booking.js

const mongoose = require('mongoose');

// Definizione del modello per la collection guest_login
const booking_schema = new mongoose.Schema({
  password: { type: String, required: true, trim: true },
  aptID: { type: mongoose.Schema.Types.ObjectId, ref: 'Appartamenti', required: true },
  guestName: { type: String, required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true }
});

const Booking = mongoose.model('Booking', booking_schema, 'booking');

module.exports = Booking;