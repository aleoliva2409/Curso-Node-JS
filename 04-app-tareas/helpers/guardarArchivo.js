const fs = require('fs')

const archivo = './db/data.json'

const guardarDB = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
}


const leerDB = () => {

  if (!fs.existsSync){
    return null
  }

  const info = fs.readFileSync(archivo, 'utf8')
  const data = JSON.parse(info)

  return data
}

module.exports = {
  guardarDB,
  leerDB
}