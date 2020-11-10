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
      case choices[0]:
        viewAllEmpl();
        break;
      case choices[1]:
        viewAllbyDept();
        break;
      case choices[2]:
        viewAllbyMang();
        break;
      case choices[3]:
        addEmpl();
        break;
      case choices[4]:
        removeEmpl();
        break;
      case choices[5]:
        updateEmplRole();
        break;
      case choices[6]:
        updateEmplMang();
        break;
      case choices[7]:
        viewAllRoles();
        break;
      case choices[8]:
        addRole();
        break;
      case choices[9]:
        removeRole();
        break;
      case choices[10]:
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

