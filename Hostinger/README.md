# Subida Masiva de Artículos a Hostinger

Este proyecto permite la subida masiva de artículos a Hostinger desde un archivo JSON generado a partir de un Excel.

## Paso 1: Instalación de Dependencias

En la consola, ejecuta el siguiente comando para posicionarte en la carpeta y el otro para instalar las dependencias necesarias:

```bash
cd Hostinger
```

```bash
npm install
```

Luego, convierte el archivo Excel a JSON utilizando la herramienta TableConvert.

Nota: Asegúrate de renombrar el archivo JSON descargado a productos.json y colócalo en la carpeta Hostinger del proyecto. Si se te pide sobrescribir el archivo existente, acepta la acción.



## Paso 2: Configuración conexción a Hostinger
Cambia los datos de conexcion por default a la db por tus datos:

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'srv1549.hstgr.io',      // Cambia esto al host de tu base de datos
  user: 'user_name',      // Cambia esto a tu usuario de MySQL
  password: 'password',         // Cambia esto a tu contraseña de MySQL
  database: 'nombre data base' // Cambia esto al nombre de tu base de datos
});


## Paso 3: Ejecutar el Script
En la consola, ejecuta el siguiente comando para subir los artículos a Hostinger:

```bash
node db.js
```

Espera a que se complete la carga. ¡Y listo!

Soporte
Para cualquier consulta o aporte, puedes contactarme a través de:

Email: falciglionicolas@gmail.com
