const express = require('express');
const compress = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const tmp = require('tmp');

const { logs, corsOptions } = require('../constants');
const session = require('./session');
const routes = require('../api/routes/v1');
const error = require('../api/middlewares/error');

/**
 * Express instance
 * @public
 */
const app = express();

// TODO: Include CSRF middlewares here

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// This middleware take care of the origin when the origin is undefined.
// origin is undefined when request is local
// ! You might want to remove this in prod
app.use((req, res, next) => {
  req.headers.origin = req.headers.origin || req.headers.host;
  next();
});
app.use(cors(corsOptions));

// session middlewares
app.use(session());

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// temporary files created using tmp will be deleted on UncaughtException
tmp.setGracefulCleanup();

module.exports = app;
