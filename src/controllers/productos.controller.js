// Aquí se atienden las solicitudes de productos y se preparan sus respuestas.
const mongoose = require('mongoose');
const Producto = require('../models/producto');

function idValido(id) {
  return mongoose.isValidObjectId(id);
}

async function listarProductos(_req, res, next) {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 });
    return res.status(200).json({ total: productos.length, productos });
  } catch (error) { return next(error); }
}

async function obtenerProducto(req, res, next) {
  // Se revisa el formato del ID antes de consultar la base de datos.
  if (!idValido(req.params.id)) return res.status(400).json({ error: 'El identificador no es válido.' });
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' });
    return res.status(200).json(producto);
  } catch (error) { return next(error); }
}

async function crearProducto(req, res, next) {
  try {
    const producto = await Producto.create(req.body);
    return res.status(201).json({ mensaje: 'Producto creado correctamente.', producto });
  } catch (error) { return next(error); }
}

async function actualizarProducto(req, res, next) {
  if (!idValido(req.params.id)) return res.status(400).json({ error: 'El identificador no es válido.' });
  // Evita aceptar una actualización vacía que no cambiaría nada.
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Envía al menos un campo para actualizar.' });
  }
  try {
    // Los validadores del modelo también se aplican cuando se actualiza un producto.
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' });
    return res.status(200).json({ mensaje: 'Producto actualizado correctamente.', producto });
  } catch (error) { return next(error); }
}

async function eliminarProducto(req, res, next) {
  if (!idValido(req.params.id)) return res.status(400).json({ error: 'El identificador no es válido.' });
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' });
    return res.status(200).json({ mensaje: 'Producto eliminado correctamente.', producto });
  } catch (error) { return next(error); }
}

module.exports = { listarProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto };
