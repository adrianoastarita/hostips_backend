// src/services/auth_service.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

//const backendUrl = 'https://hostips-app.onrender.com';
const backendUrl = Constants.expoConfig.extra.BACKEND_URL;

// Funzione per verificare la password
export const handleAccessButtonPress = async (password) => {
  try {
    const response = await axios.post(`${backendUrl}/api/verify-password`, { password });
    if (response && response.data) {
      if (response.data.success) {
        // ✅ Salviamo il token in AsyncStorage
        await AsyncStorage.setItem('token', response.data.token); 
        console.log('Token salvato');
        // Restituiamo il token anche al chiamante
        return { success: true, message: response.data.message, token: response.data.token };
      } else {
        return { success: false, message: response.data.message };
      }
    }
  } catch (error) {
    console.error("Errore durante la richiesta al backend:", error);
    if (error.response) {
      console.error("Errore nella risposta del server:", error.response);
    } else if (error.request) {
      console.error("La richiesta è stata fatta ma non c'è risposta:", error.request);
    } else {
      console.error("Errore durante la configurazione della richiesta:", error.message);
    }
    return { success: false, message: 'Errore di connessione: Impossibile connettersi al server.' };
  }
};

// Funzione per importare dati appartamento
export const getApartmentData = async (aptID) => {
  try {
    // Effettua la richiesta GET per ottenere i dettagli dell'appartamento
    const response = await axios.get(`${backendUrl}/api/apt-list/${aptID}`);
    // Se la richiesta ha successo, ritorna i dati dell'appartamento
    if (response && response.data) {
      console.log('Dettagli dell\'appartamento:', response.data);
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Nessun dato trovato.' };
    }
  } catch (error) {
    // Gestione degli errori
    console.error('Errore durante la richiesta al backend (getAparmentData):', error);
    // Se la richiesta ha fallito, restituiamo un messaggio di errore
    if (error.response) {
      console.error('Errore nella risposta del server:', error.response);
      return { success: false, message: `Errore del server: ${error.response.status}` };
    } else if (error.request) {
      console.error('La richiesta è stata fatta ma non c\'è risposta:', error.request);
      return { success: false, message: 'Errore di rete: Nessuna risposta dal server' };
    } else {
      console.error('Errore durante la configurazione della richiesta:', error.message);
      return { success: false, message: `Errore: ${error.message}` };
    }
  }
};

// Funzione per importare dati zona
export const getZoneData = async (zoneID) => {
  try {
    const response = await axios.get(`${backendUrl}/api/zone-data/${zoneID}`);
    if (response && response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Nessun dato trovato.' };
    }
  } catch (error) {
    // Gestione degli errori
    console.error('Errore durante la richiesta al backend (getZoneData):', error);
    // Se la richiesta ha fallito, restituiamo un messaggio di errore
    if (error.response) {
      console.error('Errore nella risposta del server:', error.response);
      return { success: false, message: `Errore del server: ${error.response.status}` };
    } else if (error.request) {
      console.error('La richiesta è stata fatta ma non c\'è risposta:', error.request);
      return { success: false, message: 'Errore di rete: Nessuna risposta dal server' };
    } else {
      console.error('Errore durante la configurazione della richiesta:', error.message);
      return { success: false, message: `Errore: ${error.message}` };
    }
  }
};

//Funzione per importare le categorie con dei partner nella zona desiderata
export const getPartnerData = async (zoneID) => {
  try {
    const response = await axios.get(`${backendUrl}/api/partner-zone/${zoneID}`);
    if (response && response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Nessun dato trovato.' };
    }
  } catch (error) {
    // Gestione degli errori
    console.error('Errore durante la richiesta al backend (getPartnerData):', error);
    // Se la richiesta ha fallito, restituiamo un messaggio di errore
    if (error.response) {
      console.error('Errore nella risposta del server:', error.response);
      return { success: false, message: `Errore del server: ${error.response.status}` };
    } else if (error.request) {
      console.error('La richiesta è stata fatta ma non c\'è risposta:', error.request);
      return { success: false, message: 'Errore di rete: Nessuna risposta dal server' };
    } else {
      console.error('Errore durante la configurazione della richiesta:', error.message);
      return { success: false, message: `Errore: ${error.message}` };
    }
  }
};

// Funzione per importare i partner associati alla categoria e alla zona
export const getList = async (zoneID, catID) => {
  try {
    // Passa anche catID alla richiesta
    const response = await axios.get(`${backendUrl}/api/partner-list/${zoneID}/${catID}`);
    if (response && response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Nessun dato trovato.' };
    }
  } catch (error) {
    console.error('Errore durante la richiesta al backend (getList):', error);
    if (error.response) {
      console.error('Errore nella risposta del server:', error.response);
      return { success: false, message: `Errore del server: ${error.response.status}` };
    } else if (error.request) {
      console.error('La richiesta è stata fatta ma non c\'è risposta:', error.request);
      return { success: false, message: 'Errore di rete: Nessuna risposta dal server' };
    } else {
      console.error('Errore durante la configurazione della richiesta:', error.message);
      return { success: false, message: `Errore: ${error.message}` };
    }
  }
};
