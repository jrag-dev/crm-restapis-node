const mongoose = require('mongoose');
const Schema = mongoose.Schema


const clientesSchema = new Schema({
  nombre: {
    type: String,
    trim: true
  },
  apellido: {
    type: String,
    trim: true
  },
  empresa: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  telefono: {
    type: String,
    trim: true
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios'
  },
  creado: {
    type: Date,
    default: Date.now()
  }
})


module.exports = mongoose.model('Clientes', clientesSchema);
