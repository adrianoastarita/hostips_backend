// partner_routes.js (backend)

const express = require('express');   // Importa express
const router = express.Router();      // Crea un nuovo router
const mongoose = require('mongoose');

const Partner = require('../../models/Partner');
const Coupon = require('../../models/Coupon');


// Definizione dell'endpoint per ottenere la promozione di un partner
router.get('/get-promotion/:partnerID', async (req, res) => {
  try {
    const { partnerID } = req.params;  // Ottieni il partnerID dalla URL

    // Verifica se il partnerID è un ObjectId valido
    if (!mongoose.Types.ObjectId.isValid(partnerID)) {
      return res.status(400).json({ message: 'ID del partner non valido' });
    }

    // Cerca il partner nel database con l'ObjectId
    const partner = await Partner.findById(partnerID);

    if (!partner) {
      return res.status(404).json({ message: 'Partner non trovato' });
    }

    // Restituisci solo il campo 'promozione'
    res.json({ promozione: partner.promozione });
  } catch (error) {
    console.error('Errore durante il recupero della promozione:', error);
    res.status(500).json({ message: 'Errore interno del server' });
  }
});

// Endpoint per creare un nuovo coupon
router.post('/new-coupon', async (req, res) => {
  const { bookingID, partnerID, codice} = req.body;
  try {
    // Crea un nuovo documento nella collection "Booking"
    const newCoupon = new Coupon({
      bookingID: new mongoose.Types.ObjectId(bookingID),
      partnerID: new mongoose.Types.ObjectId(partnerID),
      codice
    });

    // Salva il nuovo codice
    const savedCoupon = await newCoupon.save();

    // Rispondi con il nuovo oggetto creato
    return res.status(201).json(savedCoupon);
  } catch (error) {
    console.error('Errore nella creazione del coupon:', error);
    return res.status(500).json({ message: 'Errore interno del server' });
  }
});

// Endpoint per cercare l'esistenza di un coupon (o per estrarli tutti)
router.get('/get-coupon/:bookingID?/:partnerID?', async (req, res) => {
  const { bookingID, partnerID } = req.params;
  try {
    const query = {};
    if (bookingID) {
      query.bookingID = bookingID; // Se è stato passato, aggiungi alla query
    }
    if (partnerID) {
      query.partnerID = partnerID; // Se è stato passato, aggiungi alla query
    }
    const coupon = await Coupon.find(query);
    return res.json(coupon);
  } catch (error) {
    console.error('Errore durante il recupero del coupon:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});

module.exports = router; // Esporta il router

