// restaurant_routes.js (backend)

const express = require('express');   // Importa express
const router = express.Router();      // Crea un nuovo router
const mongoose = require('mongoose');

const Prenotazioni = require('../../models/Prenotazioni');

// Definizione dell'endpoint per ottenere le prenotazioni di un guest
router.get('/get-reservations/:bookingID', async (req, res) => {
  try {
    const { bookingID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingID)) {
      return res.status(400).json({ message: 'ID del guest non valido' });
    }

    // Cerca le prenotazioni nel database con l'ObjectId
    const prenotazioni = await Prenotazioni.find({bookingID: new mongoose.Types.ObjectId(bookingID)});
    res.json(prenotazioni);
  } catch (error) {
    console.error('Errore durante il recupero delle prenotazioni:', error);
    res.status(500).json({ message: 'Errore interno del server' });
  }
});

module.exports = router; // Esporta il router

