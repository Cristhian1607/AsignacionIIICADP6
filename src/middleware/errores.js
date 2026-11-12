// Respuestas comunes para rutas inexistentes y errores de datos o de conexión.
function notFound(req, res) {
  res.status(404).json({ error: 'Ruta no encontrada.', ruta: req.originalUrl });
}

function errorHandler(error, req, res, _next) {
  if (res.headersSent) return;

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la solicitud no contiene JSON válido.' });
  }
  // Los errores de validación se explican para que sea fácil corregir la solicitud.
  if (error.name === 'ValidationError') {
    const detalles = Object.values(error.errors).map((item) => ({ campo: item.path, mensaje: item.message }));
    return res.status(400).json({ error: 'Los datos del producto no son válidos.', detalles });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ error: `Valor no válido para el campo ${error.path}.` });
  }
  if (error.code === 11000) {
    return res.status(409).json({ error: 'Ya existe un producto con ese valor único.' });
  }
  if (error.name === 'MongooseServerSelectionError' || error.name === 'MongoNetworkError') {
    return res.status(503).json({ error: 'MongoDB no está disponible.', detalle: error.message });
  }

  console.error(error);
  return res.status(500).json({ error: 'Error interno del servidor.' });
}

module.exports = { notFound, errorHandler };
