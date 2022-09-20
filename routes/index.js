const express = require('express');

const {
  nuevoCliente, 
  mostrarClientes, 
  mostrarCliente, 
  actualizarCliente, 
  eliminarCliente
} = require('../controllers/clientesController');

const {
  nuevoPedido,
  mostrarPedidos,
  mostrarPedido,
  updatePedido,
  deletePedido
} = require('../controllers/pedidosController');

const {
  nuevoProducto, 
  subirArchivo, 
  mostrarProductos, 
  mostrarProducto, 
  actualizarProducto,
  eliminarProducto,
  searchProducto
} = require('../controllers/productosController');

const {
  registrarUsuario, 
  autenticarUsuario,
  usuarioAutenticado
} = require('../controllers/usuariosController');

const auth = require('../middleware/auth');

const router = express.Router();



module.exports = () => {

  // Rutas para clientes
  router.post('/clientes', auth, nuevoCliente);
  router.get('/clientes', auth, mostrarClientes);
  router.get('/clientes/:id', mostrarCliente);
  router.put('/clientes/:id', actualizarCliente);
  router.delete('/clientes/:id', eliminarCliente);

  // Rutas para productos¡
  router.post('/productos', subirArchivo, nuevoProducto);
  router.get('/productos', mostrarProductos)
  router.get('/productos/:id', mostrarProducto)
  router.put('/productos/:id', subirArchivo, actualizarProducto)
  router.delete('/productos/:id', eliminarProducto)
  router.post('/productos/search/:query', searchProducto)


  // rutas para pedidos
  router.post('/pedidos', auth, nuevoPedido)
  router.get('/pedidos', auth, mostrarPedidos)
  router.get('/pedidos/:id', mostrarPedido)
  router.put('/pedidos/:id', updatePedido)
  router.delete('/pedidos/:id', deletePedido)

  // rutas para usuarios
  router.post('/usuarios/crear-cuenta', registrarUsuario)
  router.post('/usuarios/iniciar-sesion', autenticarUsuario)
  router.get('/usuarios/auth', 
    auth, 
    usuarioAutenticado
  )


  return router
}
