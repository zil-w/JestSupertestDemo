// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => { //it seems like if a error/status code was already provided to a request that reached this point, they won't be overwritten
  console.log(error.message)
  return response.status(400).json({ error: `This error is handled by default errorHandler: ${error.message}` })
}

const unknownEndpoint = (request, response) => {
  response.status(400).json({ error: 'Unknown endpoint.' })
}

module.exports = { errorHandler, unknownEndpoint }