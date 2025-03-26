// login_routes.js (backend)

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');


// Modello della collection booking
const Booking = require('../models/Booking');

// Endpoint per verificare la password e generare un token
router.post('/verify-password', async (req, res) => {
  const { password } = req.body;
  console.log(`Ricevuta richiesta con password: ${password}`);

  try {
    const booking = await Booking.findOne({ password });
    if (booking) {
      const token = jwt.sign(
        { bookingID: booking._id, aptID: booking.aptID, checkin: booking.checkin, checkout:booking.checkout },
        'SECRET_KEY',
        { expiresIn: '1h' }
      );

      // Includi il token nella risposta
      return res.status(200).json({
        success: true,
        message: 'Codice corretto!',
        token: token, // 🔥 Aggiunto token nella risposta
      });
    } else {
      return res.status(200).json({ success: false, message: 'Codice non riconosciuto!' });
    }
  } catch (error) {
    console.error('Errore interno del server:', error);
    return res.status(500).json({ success: false, message: 'Errore interno del server.' });
  }
});




module.exports = router;