const mongoose = require('mongoose')
const Schema = mongoose.Schema



const usuariosSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  nombre: {
    type: String,
    required: 'Agrega tu nombre',
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  registro: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Usuarios', usuariosSchema)
