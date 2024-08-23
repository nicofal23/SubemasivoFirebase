// Importar las funciones necesarias de Firebase
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, setDoc, doc } = require("firebase/firestore");
const fs = require('fs');

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Leer el archivo JSON
fs.readFile('productos.json', 'utf8', async (err, jsonString) => {
  if (err) {
    console.log("Error al leer el archivo:", err);
    return;
  }

  try {
    const data = JSON.parse(jsonString);

    // Función para subir los datos a Firebase Firestore
    const collectionRef = collection(db, "articulos"); // Cambia 'articulos' por el nombre de tu colección

    for (let item of data) {
      const docRef = doc(collectionRef, item.SKU.toString()); // Usar SKU como ID de documento
      await setDoc(docRef, item);
      console.log(`Artículo ${item.SKU} subido con éxito.`);
    }

    console.log("Subida completada.");
  } catch (err) {
    console.log("Error al parsear JSON:", err);
  }
});
