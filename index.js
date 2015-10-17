var express = require('express');
var pg = require('pg');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('node_test', 'portabledino', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' //attribute firstName user-facing
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function(){
  //Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

user = User.findAll().then(function (user) {
  return user.name
});

var app = express();

app.get('/', function(req, res) {
  res.send(user);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server at %s:%s', host, port);
});

