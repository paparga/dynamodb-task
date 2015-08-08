'use strict';

var DOC = require('dynamodb-doc');
var Async = require('control.async')

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

var dynoHelpers = ['BinToStr','Set','Condition','StrToBin'];


function Dyno(awsClient) {
  var dyno = {};
  var docClient = new DOC.DynamoDB(awsClient);

  dynoMethods.forEach(function (method) {
    dyno[method] = Async.liftNode(docClient[method]);
  });

  dynoHelpers.forEach(function (helper) {
    dyno[helper] = docClient[helper];
  });

  return dyno;
}
