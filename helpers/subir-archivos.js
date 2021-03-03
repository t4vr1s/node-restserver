const { v4: uuidv4 } = require('uuid')
const path = require('path')
const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']
const subirArchivo = (
  files,
  extensiones = extensionesValidas,
  carpeta = ''
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files
    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[nombreCortado.length - 1]

    if (!extensiones.includes(extension)) {
      return reject(
        new Error(`Solo se permiten extensiones: ${extensiones}`)
      )
    }
    const nombreTemp = `${uuidv4()}.${extension}`
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp)
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(new Error(err))
      }

      resolve(nombreTemp)
    })
  })
}

module.exports = {
  subirArchivo
}
