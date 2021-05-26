require('dotenv').config()

const portNum = process.env.PORT || process.env.PORT_NUM || 3003
const NODE_ENV = process.env.NODE_ENV

let mongoUrl = process.env.DB_URL
if(NODE_ENV === 'test'){
  mongoUrl = process.env.TEST_DB_URL
  console.log('we are running in test mode!')
}
else if(NODE_ENV === 'cypress_test'){
  mongoUrl = process.env.CYPRESS_TEST_DB_URL
  console.log('we are running in E2E test mode!')
}
else{
  console.log('we are not running in test modes!')
}

module.exports = { portNum, NODE_ENV, mongoUrl }