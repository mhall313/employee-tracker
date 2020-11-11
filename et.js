const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require('figlet');
const Employee = require("./future state/employee");

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

//Fun lil ascii art in the beginning
function init(){
  figlet("Employee Tracker", function(err, data){
    if (err) throw err;
    console.log(data);
    start();
  });
}
//Main menu 
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
        "Add Role",
        "Remove Role",
        "View All Departments",
        "Add Department",
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
      case "Add Role":
        addRole();
        break;
      case "Remove Role":
        removeRole();
        break;
      case "View All Departments":
        viewAllDept();
        break;
      case "Add Department":
        addDept();
        break;
      case "I'm done.":
        console.log("Thank you for using Employee Tracker.");
        return
    }
  });
}

//ADDITION NEEDED: show manager rather than manager id?
function viewAllEmpl(){
  connection.query(
    "SELECT employee.`id`, employee.`first_name`, employee.`last_name`, employee.`manager_id`, role.`title`, role.`salary`, department.`dept_name`  FROM `employee` LEFT JOIN `role` ON employee.`role_id` = role.`id` LEFT JOIN `department` on role.`department_id` = department.`id`",
    function (err, res){
      let employees = [];
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        employees.push({
            "Employee ID": res[i].id,
            "First Name": res[i].first_name,
            "Last Name": res[i].last_name,
            "Title": res[i].title,
            "Salary": res[i].salary,
            "Department": res[i].dept_name,
            "Manager ID": res[i].manager_id
          });
      }
      console.table(employees);
      start();
    });
}

//ADDITION NEEDED: show manager rather than manager id?
function viewAllbyDept(){
  connection.query(
    "SELECT employee.`id`, employee.`first_name`, employee.`last_name`, employee.`manager_id`, role.`title`, role.`salary`, department.`dept_name`  FROM `employee` LEFT JOIN `role` ON employee.`role_id` = role.`id` LEFT JOIN `department` on role.`department_id` = department.`id` ORDER BY department.`dept_name` ASC",
    function (err, res){
      let employees = [];
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        employees.push({
            "Employee ID": res[i].id,
            "First Name": res[i].first_name,
            "Last Name": res[i].last_name,
            "Title": res[i].title,
            "Salary": res[i].salary,
            "Department": res[i].dept_name,
            "Manager ID": res[i].manager_id
          });
      }
      console.table(employees);
      start();
    });
}

//ADDITION NEEDED: show manager rather than manager id?
function viewAllbyMang (){
  connection.query(
    "SELECT employee.`id`, employee.`first_name`, employee.`last_name`, employee.`manager_id`, role.`title`, role.`salary`, department.`dept_name`  FROM `employee` LEFT JOIN `role` ON employee.`role_id` = role.`id` LEFT JOIN `department` on role.`department_id` = department.`id` ORDER BY employee.`manager_id` ASC",
    function (err, res){
      let employees = [];
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        employees.push({
            "Employee ID": res[i].id,
            "First Name": res[i].first_name,
            "Last Name": res[i].last_name,
            "Title": res[i].title,
            "Salary": res[i].salary,
            "Department": res[i].dept_name,
            "Manager ID": res[i].manager_id
          });
      }
      console.table(employees);
      start();
    });
}

//ADDITION NEEDED: change role to be a join find sitch with the role table
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
          type: "rawlist",
          name: "role",
          message: "What is this employee's role?",
          choices: function() {
            let choiceArray = [];
              for(let i = 0; i < res.length; i++){
                choiceArray.push(res[i].title);
              }
              return choiceArray;
          }
        }
      ]).then(function(answer){
        let roleid = 0;
        switch(answer.role){
          case "Software Engineer":
            roleid = 100;
            break;
          case "Accountant":
            roleid = 200;
            break;
          case "Sales Person":
            roleid = 300;
            break;
          case "Sales Lead":
            roleid = 301;
            break;
          case "Legal Team Lead":
            roleid = 401;
            break;
          case "Lawyer":
            roleid = 400;
            break;
        }
        connection.query("INSERT INTO employee SET?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: roleid,
        },
        function(err,res){
          console.log(answer.firstName + " " + answer.lastName + " has been added.");
          start();
        }); //second connection end
      }) // then end
  }); //connection end
} //function end
        
//Complete I think ..
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

//Complete I think ...
function viewAllRoles(){
  connection.query(
    "SELECT role.`id`, role.`title`, role.`salary`, department.`dept_name`  FROM `role` LEFT JOIN `department` ON role.`department_id` = department.`id`"
    , function (err, res){
      let roles = [];
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        roles.push({
            "Role ID": res[i].id,
            "Title": res[i].title,
            "Salary": res[i].salary,
            "Department": res[i].dept_name
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
//Complete I think ..
function viewAllDept(){
  connection.query(
    "SELECT * FROM department", function (err, res){
      let dept = [];
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        dept.push({
            "Department ID": res[i].id,
            "Department": res[i].dept_name
          });
      }
      console.table(dept);
      start();
    });
}

function addDept(){

}

