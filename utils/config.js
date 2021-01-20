require('dotenv').config()
let mongoUrl = process.env.DB_URL
const portNum = process.env.PORT_NUM || 3003

if(process.env.NODE_ENV === 'test'){
  mongoUrl = process.env.TEST_DB_URL
}

module.exports = { mongoUrl, portNum }