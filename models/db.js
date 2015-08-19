var settings = require('../settings');
// var Db = require('mongodb').Db;
// var Connection = require('mongodb').Connection;
// console.log(Connection);
// var Server = require('mongodb').Server;
// console.log(settings.host);
// module.exports = new Db(settings.db,new Server(settings.host,Connection.DEFAULT_PORT,{}));


var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Code = require('mongodb').Code;
   // BSON = require('mongodb').pure().BSON,
   // assert = require('assert');

module.exports = new Db(settings.db, new Server("127.0.0.1", 27017,
 {auto_reconnect: false, poolSize: 4}), {w:0, native_parser: false});