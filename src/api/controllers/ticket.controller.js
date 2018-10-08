const httpStatus = require('http-status');
const responseService = require('../services/response.service');
const logger = require('../../api/utils/logger');
const chalk = require('chalk');
const {executeQuery} = require('../repository/index')
const dateTime = require('node-datetime');


exports.saveTicket = (req, res, next) => {

  try {
    // const { title } = req.body;
    // const { problemType  } = req.body;
    let query ='SELECT MAX(id) as id FROM mtix.ticket';
   
    executeQuery(query).then(data => {
     const ticketId = 'GLOBO' + data[0].id;
      if(req.body.problemType==1002){
       query = "INSERT INTO mtix.ticket (ticketId, raiseBy, assignedTo, status, addedOn, updateOn, updateBy, title, description, problemType, priorityLevel , country , operator)" +
       "VALUES () ";
      }
      else{
       query = `INSERT INTO mtix.ticket (ticketId, raiseBy, assignedTo, status,addedOn, updateOn, updateBy, title, description, problemType, priorityLevel)
        VALUES ('${ticketId}' ,${req.body.raiseBy},${req.body.assignTo},'${req.body.status}',current_timestamp,current_timestamp,${req.body.assignTo},'${req.body.title}','${req.body.details}',${req.body.problemType},${req.body.priorityLevel})`;
      }
      executeQuery(query).then(data => {
        console.log(data);
        res.send(data);
      });
      
    });
  } catch (e) {
    next(e);
  }
};

exports.getAllTickets = async(req, res, next) => {
    try {
      const query = 'select * from ticket';
       executeQuery(query).then(data => {res.send(data)
       });
    } catch (e) {
      next(e);
    }
  };

  exports.updateStatus = async(req, res, next) => {
    try {
      const query = `update mtix.ticket set status = '${req.body.status}' where id = '${req.body.id}' `;
       executeQuery(query).then(data => {res.send(data)
       });
    } catch (e) {
      next(e);
    }
  };

  exports.updatePriority = async(req, res, next) => {
    try {
      const query = `update mtix.ticket set priorityLevel = ${req.body.priorityLevel} where id = '${req.body.id}' `;
       executeQuery(query).then(data => {res.send(data)
       });
    } catch (e) {
      next(e);
    }
  };

  exports.updateAssignTo = async(req, res, next) => {
    try {
      const query = `update mtix.ticket set assignedTo = '${req.body.assignedTo}' where id = '${req.body.id}' `;
       executeQuery(query).then(data => {res.send(data)
       });
    } catch (e) {
      next(e);
    }
  };
  
