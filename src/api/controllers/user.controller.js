const httpStatus = require('http-status');
const responseService = require('../services/response.service');
const {executeQuery} = require('../repository/index')

exports.allUsers = (req, res, next) => {
  try {
    const query = `select * from mtix.users`;
    executeQuery(query).then(data => {res.send(data)
    });
  } catch (e) {
    next(e);
  }
};
