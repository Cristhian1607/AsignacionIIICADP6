// Lee la configuración local desde .env antes de preparar la aplicación.
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const port = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    // Primero conecta la base de datos; luego abre el servicio en el puerto elegido.
    await connectDB();
    app.listen(port, () => console.log(`API disponible en http://localhost:${port}`));
  } catch (error) {
    console.error(`No se pudo iniciar el servicio: ${error.message}`);
    process.exitCode = 1;
  }
}

// Esta condición permite importar la aplicación en las pruebas sin abrir otro servidor.
if (require.main === module) startServer();

module.exports = { startServer };
