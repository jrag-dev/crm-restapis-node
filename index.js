const express = require('express');
const conectarDB = require('./config/db');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' })


// crear el servidor
const app = express();

app.use(express.static('uploads'))

// conectar a la base de datos
conectarDB();
//DB_URL='mongodb://localhost/crm-restapis'

//app.use(express.urlencoded({ extended: true }));

// Habilitar body Parser
app.use(express.json({extended: true }))


// Definir un dominio para recibir las peticiones
const whilelist = [process.env.FRONTEND_URL];
const corsOption = {
  origin: (origin, callback) => {
    // Revisar si la peticion d¡vienede un servidor que esta en whiteLits
    const existe = whilelist.some(dominio => {
      //console.log(dominio.length + ':' + origin.length);
      return dominio === origin;
    });
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'))
    }
  }
}

// habilitar cors
app.use(cors(corsOption));

// rutas de la app
app.use('/', routes())



const port = process.env.port || 4000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log('Servidor escuchando por el puerto 4000')
})
