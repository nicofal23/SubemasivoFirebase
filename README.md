# Subida Masiva de Artículos a Firebase

Este proyecto permite la subida masiva de artículos a Firebase Firestore desde un archivo JSON generado a partir de un Excel.

## Paso 1: Instalación de Dependencias

En la consola, ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

Luego, convierte el archivo Excel a JSON utilizando la herramienta TableConvert.

Nota: Asegúrate de renombrar el archivo JSON descargado a productos.json y colócalo en la raíz del proyecto. Si se te pide sobrescribir el archivo existente, acepta la acción.

## Paso 2: Configuración de Reglas de Firebase
Cambia temporalmente las reglas de seguridad de Firestore para permitir la lectura y escritura sin autenticación:

```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Importante: Una vez completada la subida de artículos, recuerda volver a poner las reglas anteriores para asegurar la protección de tus datos.

## Paso 3: Configuración de Firebase
Abre el archivo firebase.js y reemplaza la configuración de Firebase con tus datos:

```bash
javascript
Copiar código
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

```

## Paso 4: Ejecutar el Script
En la consola, ejecuta el siguiente comando para subir los artículos a Firestore:

```bash
node firebase.js
```

Espera a que se complete la carga. ¡Y listo!

Soporte
Para cualquier consulta o aporte, puedes contactarme a través de:

Email: falciglionicolas@gmail.com
