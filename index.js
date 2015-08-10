'use strict';

var Future = require('ramda-fantasy').Future;

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
    docClient[method+"Async"] = function(params){
      return new Future(function(reject,resolve){
        docClient[method](params,_taskify(resolve,reject));
      });
    }
  });

  return docClient;
}
