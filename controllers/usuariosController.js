const Usuarios = require("../models/Usuarios")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



exports.registrarUsuario = async (req, res) => {

  try {
    // revisar que el usuario no este registrado
    let usuario = await Usuarios.findOne({ email: req.body.email })

    if (usuario) {
      return res.status(400).json({ mensaje: 'Ese email ya se encuentra registrado!' })
    }

    const newUsuario = new Usuarios(req.body)
    newUsuario.password = await bcrypt.hash(req.body.password, 12)

    // guardar el usuario
    await newUsuario.save()

    // crear y firmar el token
    const payload = {
      usuario: {
        id: newUsuario.id
      }
    }

    // firmar el token
    jwt.sign(payload, process.env.SECRETA, {
      expiresIn: 3600
    }, (error, token) => {
      if (error) throw error;

      res.json({ token })
    }
    )

  } catch (error) {
    /* handle error */
    res.status(500).json({ mensaje: 'Ocurrio un Error' })
  }

}


exports.autenticarUsuario = async (req, res) => {

  const { email, password } = req.body

  try {
    let usuario = await Usuarios.findOne({ email }) 

    if (!usuario) {
      return res.status(401).json({ mensaje: 'El usuario no existe' })
    }

    const passwordCorrecto = await bcrypt.compare(password, usuario.password)

    if (!passwordCorrecto) {
      return res.status(401).json({ mensaje: 'El password es incorrecto' })
    }

    // crear y firmar el token
    const payload = {
      usuario: {
        id: usuario.id
      }
    }
    jwt.sign(payload, process.env.SECRETA,
      {
        expiresIn: 3600
      }, (error, token) => {
        if (error) throw error;

        res.json({ token })
      }
    )

  } catch (error) {
    /* handle error */
    console.log(error)
    res.status(500).json({ mensaje: 'Ocurrio un Error' })
  }
}


// Obtener el usuario que esta autenticado

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuarios.findById(req.usuario.id).select('-password') 
    res.json(usuario)
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Ocurrio un error' })
  }
}
