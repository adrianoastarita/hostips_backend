// login_routes.js (backend)

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');


const Hosts = require('../../models/Hosts');

// Endpoint per verificare la password e generare un token
router.post('/verify-credentials', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Ricevuta richiesta con dati: ${email} e ${password}`);

  try {
    const host = await Hosts.findOne({ email, password });
    if (host) {
      const token = jwt.sign(
        { hostID: host._id, hostEMAIL: host.email, hostPASSWORD: host.password},
        'SECRET_KEY',
        { expiresIn: '1h' }
      );

      // Includi il token nella risposta
      return res.status(200).json({
        success: true,
        message: 'Credenziali corrette!',
        token: token, // 🔥 Aggiunto token nella risposta
      });
    } else {
      return res.status(200).json({ success: false, message: 'Credenziali non riconosciute!' });
    }
  } catch (error) {
    console.error('Errore interno del server:', error);
    return res.status(500).json({ success: false, message: 'Errore interno del server.' });
  }
});




module.exports = router;