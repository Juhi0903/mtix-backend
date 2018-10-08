const logger = require('../../utils/logger');
const mysql = require('mysql2');

let _pool = null;

const setConnectionPool = (pool) => {
  _pool = pool;
};

const executeQuery = async (query) => {
  // logger.info('Executing query: ', query);
  try {
    // const connection = await _pool.getConnection();
    // const result = await connection.query(query,function());

    const promisePool = _pool.promise();
    const [rows, fields] = await promisePool.query(query);
    //  _pool.getConnection(function(err, connection) {
    //   if (err) throw err; // not connected!
     
    //   // Use the connection
    //   connection.query(query, function (error, results, fields) {
    //     // When done with the connection, release it.
    //     return results;

    //     // connection.release();
     
    //     // Handle error after the release.
    //     if (error) throw error;
     
    //     // Don't use the connection here, it has been returned to the pool.
    //   });
    // });
    return rows;
  } catch (e) {
    logger.info('Error in executing DB query:');
    logger.info(e);
    const modifiedError = Object.assign(e, { databaseStatus: 0 });
    throw modifiedError;
  }
};

module.exports = { executeQuery, setConnectionPool };
