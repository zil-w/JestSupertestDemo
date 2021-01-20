const http = require('http')
const app = require('./app')
const config = require('./utils/config')


const serverInstace = http.createServer(app)


const PORT = config.portNum
serverInstace.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})