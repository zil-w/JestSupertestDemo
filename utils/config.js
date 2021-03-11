require('dotenv').config()
let mongoUrl = process.env.DB_URL
const portNum = process.env.PORT_NUM || 3003

if(process.env.NODE_ENV === 'test'){
  mongoUrl = process.env.TEST_DB_URL
  console.log('we are running in test mode!')
}
else if(process.env.NODE_ENV === 'cypress_test'){
  mongoUrl = process.env.CYPRESS_TEST_DB_URL
  console.log('we are running in E2E test mode!')
}
else{
  console.log('we are not running in test modes!')
}

module.exports = { mongoUrl, portNum }