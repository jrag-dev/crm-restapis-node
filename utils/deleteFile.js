const fs = require('fs')
const path = require('path')


const deleteFile = (dirname, file) => {
  fs.unlink(path.join(dirname, file), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Archivo eliminado correctamente')
    }
  })
}

module.exports = deleteFile
