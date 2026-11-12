// Aquí se arma la API: se aceptan datos JSON y se conectan sus rutas.
const express = require('express');
const productosRoutes = require('./routes/productos.routes');
const { notFound, errorHandler } = require('./middleware/errores');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
// Esta ruta sencilla sirve para comprobar que el servicio está activo.
app.get('/health', (_req, res) => res.status(200).json({ estado: 'ok', servicio: 'API de inventario' }));
app.use('/api/productos', productosRoutes);
// Si ninguna ruta atendió la solicitud, se devuelve una respuesta clara.
app.use(notFound);
app.use(errorHandler);

module.exports = app;
