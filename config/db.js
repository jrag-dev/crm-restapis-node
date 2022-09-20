const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });


const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL) 
    console.log('Conexión a la base de datos establecida!')
  } catch (error) {
    console.log('Ocurrio un error al realizar la conexión a la DB.')
    process.exit(1);
  }
}


module.exports = conectarDB;
