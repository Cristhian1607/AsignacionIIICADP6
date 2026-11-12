// Abre la conexión con MongoDB usando la dirección guardada en .env.
const mongoose = require('mongoose');

async function connectDB(uri = process.env.MONGODB_URI) {
  if (!uri) {
    throw new Error('Falta MONGODB_URI. Crea un archivo .env a partir de .env.example.');
  }

  // Si hay un problema de conexión, se avisa antes de que la API empiece a recibir solicitudes.
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    dbName: 'inventario_asignacion_iii',
    serverSelectionTimeoutMS: 10_000,
  });
  console.log(`MongoDB conectado: ${mongoose.connection.name}`);
}

module.exports = connectDB;
