// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  return response.status(400).json({ error: error.message })
}

module.exports = { errorHandler }