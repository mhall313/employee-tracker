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
  inquirer.prompt({
    name: "startPrompt",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Employees by Department",
      "View All Employees by Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "View All Roles",
      "Add a Role",
      "Remove a Role",
      "I'm done."
    ]
  })
  .then(function(answer){
    switch(answer.startPrompt) {
      case "View All Employees":
        viewAllEmpl();
        break;
      case "View All Employees by Department":
        viewAllbyDept();
        break;
      case "View All Employees by Manager":
        viewAllbyMang();
        break;
      case "Add Employee":
        addEmpl();
        break;
      case "Remove Employee":
        removeEmpl();
        break;
      case "Update Employee Role":
        updateEmplRole();
        break;
      case "Update Employee Manager":
        updateEmplMang();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "Add a Role":
        addRole();
        break;
      case "Remove a Role":
        removeRole();
        break;
      case "I'm done.":
        console.log("Thank you for using Employee Tracker.");
        return
      default:
        console.log("Please select an option.");
        start();
    }
  });
}

function viewAllEmpl(){

}

function viewAllbyDept(){

}

function viewAllbyMang (){

}

function addEmpl(){

}

function removeEmpl(){

}

function updateEmplRole(){

}

function updateEmplRole(){

}

function viewAllRoles(){

}

function addRole(){

}

function removeRole(){
  
}

