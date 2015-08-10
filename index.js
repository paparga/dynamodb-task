'use strict';

var Task = require('data.task');

module.exports = Dyno;

var dynoMethods = [
  'batchGetItem',
  'batchWriteItem',
  'createTable',
  'deleteItem',
  'deleteTable',
  'describeTable',
  'getItem',
  'listTables',
  'putItem',
  'query',
  'scan',
  'updateItem',
  'updateTable'
];

function  _taskify(resolve,reject){
  return function(err,data){
    if (err) {
      reject(err);
    }else{
      resolve(data);
    }
  };
};


function Dyno(docClient) {
  dynoMethods.forEach(function (method) {
    docClient[method+"Task"] = function(params){
      return new Task(function(reject,resolve){
        docClient[method](params,_taskify(resolve,reject));
      });
    }
  });

  return docClient;
}
