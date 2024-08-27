const mysql = require('mysql2');
const fs = require('fs');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'srv1549.hstgr.io',      // Cambia esto al host de tu base de datos
  user: 'user_name',      // Cambia esto a tu usuario de MySQL
  password: 'password',         // Cambia esto a tu contraseña de MySQL
  database: 'nombre data base' // Cambia esto al nombre de tu base de datos
});


// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión a MySQL establecida.');

  // Crear la tabla si no existe
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS articulos (
        SKU VARCHAR(50) PRIMARY KEY,
        NOMBRE VARCHAR(255),
        PRECIO DECIMAL(10,2),
        CATEGORIA VARCHAR(100),
        LINK_IMG TEXT,
        IVA DECIMAL(5,2)
    );
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error al crear la tabla articulos:', err);
      connection.end();
      return;
    }

    console.log('Tabla articulos creada o ya existía.');

    // Leer el archivo JSON y cargar los datos
    fs.readFile('productos.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("Error al leer el archivo:", err);
        connection.end();
        return;
      }

      try {
        const data = JSON.parse(jsonString);

        // Crear un array de promesas para asegurar que todas las inserciones terminen antes de cerrar la conexión
        const promises = data.map((item) => {
          return new Promise((resolve, reject) => {
            const query = `
              INSERT INTO articulos (SKU, NOMBRE, PRECIO, CATEGORIA, LINK_IMG, IVA)
              VALUES (?, ?, ?, ?, ?, ?)
              ON DUPLICATE KEY UPDATE
                NOMBRE = VALUES(NOMBRE),
                PRECIO = VALUES(PRECIO),
                CATEGORIA = VALUES(CATEGORIA),
                LINK_IMG = VALUES(LINK_IMG),
                IVA = VALUES(IVA)
            `;

            const values = [
              item.SKU,
              item.NOMBRE,
              item.PRECIO,
              item.CATEGORIA,
              item['LINK IMG'],
              item.IVA
            ];

            connection.query(query, values, (err, results) => {
              if (err) {
                console.error(`Error al insertar el artículo ${item.SKU}:`, err);
                reject(err);
              } else {
                console.log(`Artículo ${item.SKU} subido con éxito.`);
                resolve(results);
              }
            });
          });
        });

        // Esperar a que todas las promesas se completen
        Promise.all(promises)
          .then(() => {
            console.log("Subida completada.");
            // Cerrar la conexión una vez que todas las consultas hayan sido completadas
            connection.end((err) => {
              if (err) {
                console.error('Error al cerrar la conexión MySQL:', err);
              } else {
                console.log('Conexión a MySQL cerrada.');
              }
            });
          })
          .catch((error) => {
            console.error('Error durante la subida de artículos:', error);
            // Asegurar el cierre de la conexión incluso si ocurre un error
            connection.end((err) => {
              if (err) {
                console.error('Error al cerrar la conexión MySQL:', err);
              } else {
                console.log('Conexión a MySQL cerrada.');
              }
            });
          });

      } catch (err) {
        console.log("Error al parsear JSON:", err);
        // Cerrar la conexión en caso de error al parsear el JSON
        connection.end((err) => {
          if (err) {
            console.error('Error al cerrar la conexión MySQL:', err);
          } else {
            console.log('Conexión a MySQL cerrada.');
          }
        });
      }
    });
  });
});
