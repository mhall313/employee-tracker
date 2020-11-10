const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require('figlet');
const Employee = require("./employee");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "j33zaLou!l34rn",
  database: "et_DB"
});

//connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  init();
});

//Fun lil ascii art
function init(){
  figlet("Employee Tracker", function(err, data){
    if (err) throw err;
    console.log(data);
    start();
  });
}

function start(){
  inquirer
    .prompt({
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
    }
  });
}

//ADDITION NEEDED: need to add join and show manager rather than manager id
function viewAllEmpl(){
  connection.query(
    "SELECT * FROM employee", function (err, res){
      let employees = [];
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        employees.push({
            "ID": res[i].id,
            "First Name": res[i].first_name,
            "Last Name": res[i].last_name,
            "Role ID": res[i].role_id,
            "Manager ID": res[i].manager_id
          });
      }
      console.table(employees);
      start();
    });
}

function viewAllbyDept(){

}

function viewAllbyMang (){

}

function addEmpl(){
  connection.query("SELECT * FROM role", function(err,res){
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "role",
          message: "What is this employee's role?",
          choices: function() {
            let choiceArray = [];
            for(let i = 0; i < res.length; i++){
              choiceArray.push(res[i].role);
            }
            return choiceArray;
          }
        },
        {
          type: "list",
          role
        }
      ]) //inquirer end
  }); //connect end
}

function removeEmpl(){
  connection.query("SELECT * FROM employee", function(err,res){
    if (err) throw err;
    inquirer
      .prompt({
        type: "rawlist",
        name: "emplyDel",
        message: "Which employee would you like to remove?",
        choices: function() {
          let choiceArray = [];
          for(let i = 0; i < res.length; i++){
            choiceArray.push(res[i].first_name + " " + res[i].last_name);
          }
          return choiceArray;
      }
      }).then(function(answer){
        let chosenEmpl;
        for(let i = 0; i < res.length; i++){
          let fullName = (res[i].first_name + " " + res[i].last_name);
          // console.log(fullName);
          // console.log(answer.emplyDel);
          if(fullName === answer.emplyDel){
            chosenEmpl = res[i];
            connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?",
            [chosenEmpl.first_name, chosenEmpl.last_name],
            function(err,res){
              if (err) throw err;
              console.log(chosenEmpl.first_name + " " + chosenEmpl.last_name+ " has been removed from the system.");
            }); //connection to delete end
          }; //if statement end
        }// for loop end
      start();
    });//then end
  })
}

function updateEmplRole(){

}

 function updateEmplMang(){

 }
//ADDITION NEEDED: join to show department rather than department id
function viewAllRoles(){
  connection.query(
    "SELECT * FROM role", function (err, res){
      let roles = [];
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        roles.push({
            "ID": res[i].id,
            "Title": res[i].title,
            "Salary": res[i].salary,
            "Department ID": res[i].department_id
          });
      }
      console.table(roles);
      start();
    });

}

function addRole(){

}

function removeRole(){
  
}

