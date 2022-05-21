function errorHandler (err, req, res, next) {
  if(!err.isBoom){
    res.status(500).json({
      message: err.message,
      stack: err.stack
    })
  }else{
    next(err)
  }
  
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }
}

function error404Handler (req, res,) {
  res.status(404)
  res.send ({
  message: boom.notFound('The resource you are looking for does not exist')
  })
}

module.exports = {
    errorHandler,
    boomErrorHandler,
    error404Handler
}