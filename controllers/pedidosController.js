const Pedidos = require('../models/Pedidos')
const Clientes = require('../models/Clientes')





exports.nuevoPedido = async (req, res, next) => {

  try {
    const pedido = new Pedidos(req.body)

    // agregar el creador del nuevo pedido 
    pedido.creador = req.usuario.id

    await pedido.save()
    res.json({ mensaje: 'Se agregó un nuevo pedido' })
  } catch (error) {
    console.log(error)
    next()
  }
}


exports.mostrarPedidos = async (req, res, next) => {
try {
  const pedidos = await Pedidos.find({ creador: req.usuario.id })
    .populate('cliente')
    .populate({
      path: 'pedido.producto',
      model: 'Productos'
    })
  res.json(pedidos)
} catch (error) {
  /* handle error */
  console.log(error)
  next()
}
}


exports.mostrarPedido = async (req, res, next) => {
  const { id } = req.params

  try {
    const pedido = await Pedidos.findById({ _id: id })
      .populate('cliente')
      .populate({
        path: 'pedido.producto',
        model: 'Productos'
      })

    if (!pedido) {
      res.json({ mensaje: 'Pedido no encontrado' })
      return next()
    }

    res.json(pedido)
  } catch (error) {
    /* handle error */
    console.log(error)
    next()
  }
}       


exports.updatePedido = async (req, res, next) => {

  const { id } = req.params

  try {
    const pedido = await Pedidos.findOneAndUpdate({ _id: id }, req.body, {
      new: true
    })
      .populate('cliente')
      .populate({
      path: 'pedido.producto',
      model: 'Productos'
    })

    res.json(pedido)
  } catch (error) {
    /* handle error */
    res.status(500).json({ mensaje: 'Ocurrio un error' })
    next()
  }
}


exports.deletePedido = async (req, res, next) => {

  const { id } = req.params

  try {
    await Pedidos.findOneAndDelete({ _id: id })
    res.json({ mensaje: 'Pedido eliminado correctamente' })
  } catch (error) {
    /* handle error */
    res.status(500).json({ mensaje: 'Ocurrio un error' })
    next()
  }
}
