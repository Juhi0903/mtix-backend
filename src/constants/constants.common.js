require('dotenv').config();
/**
 * This trick will get the intellisense to pick up
 * the dynamically defined constants.
 * We do not require any value here, just the shape of the object.
 * Do not worry about the values as they will be overridden by the
 * constnat.[env].js variables
 */

const shape = {
  logs: undefined,
  corsOptions: {
    origin: undefined,
    credentials: undefined,
  }
};

/**
 * Common constants across all the enviromnents (dev, staging, prod)
 */
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbConfig: {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_URI,
    database: process.env.DB_NAME,
    connectionLimit: 10
  },

  dump: {
    secret: process.env.DUMP_SECRET,
  },

  ...shape,
};
