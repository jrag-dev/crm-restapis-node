const {findOneAndRemove, findOneAndDelete} = require('../models/Clientes');
const Clientes = require('../models/Clientes');


// agrega un nuevo cliente
const nuevoCliente = async (req, res, next) => {

  try {
    const cliente = new Clientes(req.body);

    // guardar el creador del cliente (es decir, el usuario)
    cliente.creador = req.usuario.id

    // almacenar el registro
    await cliente.save();
    res.json({ mensaje: 'Se agrego un nuevo cliente' });
    
  } catch (error) {
    /* handle error */
    console.log(error);
    next()
  }
}

// muestra todos los clientes
const mostrarClientes = async (req, res, next) =>  {

  try {
    const clientes = await Clientes.find({ creador: req.usuario.id });
    res.json(clientes);
  } catch (error) {
    /* handle error */
    console.log(error);
    next();
  }
}

// muestra un cliente por su id
const mostrarCliente = async (req, res, next) => {
  const { id } = req.params;

  try {
    const cliente = await Clientes.findById(id);

    if (!cliente) {
      res.json({ mensaje: 'Ese cliente no existe!' });
      next();
    }

    res.json(cliente);
  } catch (error) {
    /* handle error */
    console.log(error);
    next();
  }
}

// actualizar un cliente por su id
const actualizarCliente = async (req, res, next) => {

  const { id } = req.params;

  try {
    const cliente = await Clientes.findOneAndUpdate({_id: id }, 
      req.body, {
        new: true
      }
    )
    res.json(cliente);
  } catch (error) {
    /* handle error */
    console.log(error);
    next();
  }
}

// eliminar un registro por su id
const eliminarCliente = async (req, res, next) => {

  const { id } = req.params;

  try {
    await Clientes.findOneAndDelete({ _id: id })
    res.json({ mensaje: 'Cliente eliminado correctamente' })
  } catch (error) {
    /* handle error */
    console.log(error);
    next();
  }
}




module.exports = {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizarCliente,
  eliminarCliente
}
