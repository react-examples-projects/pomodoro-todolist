const boom = require("@hapi/boom");
const { message } = require("../helpers/utils");
const { DEV } = require("../config/variables").SERVER;

function logErrors(err, req, res, next) {
  message.error(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  // err ya tiene un error tipo Boom
  next(err);
}

function clientErrorHandling(err, req, res, next) {
  /*  err es una instancia de Boom, por lo tanto se puede acceder a err.output
      https://hapi.dev/module/boom/api/?v=9.1.2
  */
  const { statusCode, payload } = err.output;
  // catch errors ajax or errors while streaming

  const response = { ...payload };
  if (DEV) response.errorDescription = err.message;
  return res.status(statusCode).json(response);
}

function wrapServerErrors(app) {
  if (typeof app.use !== "function") {
    throw new Error("The `app` param isn't a instace of express ");
  }
  // insertar los middlewares de errores en el servidor `app`
  app.use(logErrors);
  app.use(wrapErrors);
  app.use(clientErrorHandling);
}

module.exports = wrapServerErrors;
