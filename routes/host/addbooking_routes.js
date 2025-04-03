// addbooking_routes.js (backend)

const express = require('express');   // Importa express
const router = express.Router();      // Crea un nuovo router
const mongoose = require('mongoose');

const Appartamenti = require('../../models/Appartamenti');
const Booking = require('../../models/Booking');


router.get('/get-apartments/:hostID', async (req, res) => {

  try {
    const hostID = req.params.hostID; // Prendi l'hostID dal parametro della richiesta

    const apartments = await Appartamenti.find({ hostID: hostID }); // Cerca gli appartamenti con l'hostID specificato

    if (apartments.length === 0) {
      return res.status(404).json({ message: 'Nessun appartamento trovato per questo host' });
    }

    return res.status(200).json(apartments); // Restituisce gli appartamenti trovati
  } catch (error) {
    console.error('Errore nel recuperare gli appartamenti:', error);
    return res.status(500).json({ message: 'Errore interno del server' });
  }
});


router.get('/apt-bookings/:aptID?', async (req, res) => {
  console.log('Richiesta ricevuta con aptID:', req.params.aptID || 'Nessun ID (restituisco tutto)');

  try {
    const { aptID } = req.params;

    // Se aptID è presente, filtra per ID specifico, altrimenti restituisci tutto
    const query = aptID ? { aptID } : {};

    const aptBooking = await Booking.find(query);

    return res.status(200).json(aptBooking); // Restituisce le prenotazioni trovate (o un array vuoto se non ce ne sono)
  } catch (error) {
    console.error('Errore nel recuperare le prenotazioni:', error);
    return res.status(500).json({ message: 'Errore interno del server' });
  }
});


// Endpoint per creare una prenotazione
router.post('/new-booking', async (req, res) => {
  const { password, aptID, guestName, checkin, checkout } = req.body;

  try {
    // Crea un nuovo documento nella collection "Booking"
    const newBooking = new Booking({
      password,
      aptID: new mongoose.Types.ObjectId(aptID),
      guestName: guestName,
      checkin: new Date(checkin),
      checkout: new Date(checkout)
    });

    // Salva il nuovo documento
    const savedBooking = await newBooking.save();

    // Rispondi con il nuovo oggetto creato
    return res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Errore nella creazione della prenotazione:', error);
    return res.status(500).json({ message: 'Errore interno del server' });
  }
});


module.exports = router; // Esporta il router
