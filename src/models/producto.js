// Reglas para guardar cada producto y mantener sus datos en un formato consistente.
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  // Los nombres y textos se guardan limpios y con límites razonables.
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio.'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres.'],
    maxlength: [100, 'El nombre no puede superar 100 caracteres.'],
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria.'],
    trim: true,
    maxlength: [500, 'La descripción no puede superar 500 caracteres.'],
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es obligatoria.'],
    trim: true,
    maxlength: [60, 'La categoría no puede superar 60 caracteres.'],
  },
  // El precio admite cero o más; las unidades deben ser un entero no negativo.
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio.'],
    min: [0, 'El precio no puede ser negativo.'],
    validate: { validator: Number.isFinite, message: 'El precio debe ser un número finito.' },
  },
  cantidad: {
    type: Number,
    required: [true, 'La cantidad es obligatoria.'],
    min: [0, 'La cantidad no puede ser negativa.'],
    validate: [
      { validator: Number.isInteger, message: 'La cantidad debe ser un número entero.' },
      { validator: Number.isFinite, message: 'La cantidad debe ser un número finito.' },
    ],
  },
  // Un producto nuevo queda activo si no se envía este dato.
  estado: { type: Boolean, default: true },
}, {
  timestamps: true,
  versionKey: false,
  collection: 'Productos',
});

module.exports = mongoose.model('Producto', productoSchema);
