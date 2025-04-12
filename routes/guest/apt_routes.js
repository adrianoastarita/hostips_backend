// apt_routes.js (backend)

const express = require('express');   // Importa express
const router = express.Router();      // Crea un nuovo router

const Appartamenti = require('../../models/Appartamenti'); // Importa il modello Appartamenti
const Zone = require('../../models/Zone'); // Importa il modello Zone
const Partner = require('../../models/Partner'); // Importa il modello Partner
const Categorie = require('../../models/Categorie'); // Importa il modello Categorie


router.get('/apt-list/:aptID', async (req, res) => {
  const { aptID } = req.params;
  try {
    const apartment = await Appartamenti.findOne({ _id : aptID });
    if (apartment) {
      return res.json(apartment);
    } else {
      return res.status(404).json({ message: 'Appartamento non trovato' });
    }
  } catch (error) {
    console.error('Errore durante il recupero dell\'appartamento:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});

router.get('/zone-data/:zonaID', async (req, res) => {
  const { zonaID } = req.params;
  try {
    const apartment = await Zone.findOne({ _id : zonaID });
    if (apartment) {
      return res.json(apartment);
    } else {
      return res.status(404).json({ message: 'Zona non trovata' });
    }
  } catch (error) {
    console.error('Errore durante il recupero della zona:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});

router.get('/partner-zone/:zonaID?', async (req, res) => {
  const { zonaID } = req.params;
  try {
    const query = {};
    if (zonaID) {
      query.zonaID = zonaID; // Se è stato passato, aggiungi alla query
    }
    // Prendiamo tutti i partner della zona richiesta
    const partners = await Partner.find(query);

    if (!partners.length) {
      return res.status(404).json({ message: 'Nessun partner trovato per questa zona' });
    }
    
    const categorie = await Categorie.find();

    // Creiamo una mappa che associa l'ID della categoria al suo nome
    const categoriaMap = {};
    categorie.forEach(cat => {
      categoriaMap[cat._id] = cat.nome;
    });
    
    // Creiamo un dizionario i cui valori sono i nomi delle categorie
    const result = partners.reduce((acc, partner) => {
      const nomeCategoria = categoriaMap[partner.catID]; // Otteniamo il nome della categoria dal catID del partner
      if (nomeCategoria) {
        acc[partner.catID] = nomeCategoria; // Aggiungiamo al dizionario con l'ID della categoria come chiave e il nome come valore
      }
      return acc;
    }, {});
    return res.json(result);
  } catch (error) {
    console.error('Errore:', error);
    return res.status(500).json({ message: 'Errore del server' });
  }
});

router.get('/partner-list', async (req, res) => {
  const { zonaID, catID, partnerID } = req.query;

  try {
    const query = {};
    if (zonaID) query.zonaID = zonaID;
    if (catID) query.catID = catID;
    if (partnerID) query._id = partnerID;
    console.log('(BACKEND) QUERY --> ',query);
    // Query per cercare i partner con entrambi i parametri
    const partners = await Partner.find(query);
    
    if (partners && partners.length > 0) {
      return res.json(partners);
    } else {
      return res.status(404).json({ message: 'Partner non trovati' });
    }
  } catch (error) {
    console.error('Errore durante il recupero dei partner:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});


module.exports = router; // Esporta il router
