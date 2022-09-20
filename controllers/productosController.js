const Productos = require('../models/Productos');
const path = require('path')
const fs = require('fs')
const multer = require('multer');
const shortid = require('shortid');
const deleteFile = require('../utils/deleteFile');


//TODO: configuraciones para multer 

const dirPath = path.join(__dirname, '../uploads')

const configuracionMulter = {
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(dirPath)) {
        fs.mkdir(dirPath, function (err) {
          if (err) {
            console.log(err)
          } else {
            cb(null, dirPath)
          }
        })
      } else {
        cb(null, dirPath)
      }
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      console.log(file)
        cb(null, `${file.originalname}-${shortid.generate()}.${extension}`);
    }
  }),
  fileFilter(req, file, cb) {
    if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
        cb(null, true);
    } else {
        cb(new Error('Formato No válido'))
    }
  },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');


// Subier un archivo
exports.subirArchivo = (req, res, next) => {
   upload(req, res, function(error) {
      if (error) {
         res.json({mensaje: error})
      }
      return next();
   })
}



// Agrega nuevos productos
exports.nuevoProducto = async (req, res, next) => {
   const producto = new Productos(req.body);

   try {
        if (req.file.filename) {
            producto.imagen = req.file.filename
        }
        // Almnacenar los productos
        await producto.save();
        res.json({ mensaje: 'Se agrego un nuevo producto'})
   } catch (error) {
      
   }
}

exports.mostrarProductos = async (req, res, next) => {

  try {
    const productos = await Productos.find({}) 

    res.json(productos)
  } catch (error) {
    console.log(error);
    next()
  }
}


exports.mostrarProducto = async (req, res, next) => {

  const { id } = req.params

  try {
    const producto = await Productos.findById({ _id: id }) 

    if (!producto) {
      res.json({ mensaje: 'Producto no encontado' })
    }

    res.json(producto)
  } catch (error) {
    console.log(error)
    next()
  }
}


exports.actualizarProducto = async (req, res, next) => {

  const { id } = req.params

  try {
    // construir un nuevo producto
    let nuevoProducto = req.body

    // verificar si viene una nueva imagen
    if (req.file.filename) {
      nuevoProducto.imagen = req.file.filename
    } else {
      let productoAnterior = await Productos.findById({ _id: id })
      nuevoProducto.imagen = productoAnterior.imagen
    }

    let producto = await Productos.findOneAndUpdate({ _id: id }, nuevoProducto, {
      new: true,
    })
    res.json(producto)
  } catch (error) {
    console.log(error)
    next()
  }

}


exports.eliminarProducto = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const producto = await Productos.findById({ _id: id }) 

    if (!producto) {
      res.status(404).json({ mensaje: 'Producto no encontrado' })
      return next()
    }

    deleteFile(dirPath, producto.imagen)

    await Productos.findOneAndRemove({ _id: id })

    res.json({ mensaje: 'Producto eliminado correctamente' })
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Ocurrio un error' })
  }
}


exports.searchProducto = async (req, res, next) => {
  
  try {
    // obtener el query
    const { query } = req.params
    const producto = await Productos.find({ nombre: new RegExp(query, 'i') })
    res.json(producto)
  } catch (error) {
    console.log(error)
    next()
  }
}
