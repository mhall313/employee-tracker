var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "j33zaLou!l34rn",
  database: "et_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start(){

}

