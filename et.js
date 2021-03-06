const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require('figlet');

//Development of classes and methods for common sql queries would be developed in a future state
//const Employee = require("./future state/employee");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
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
        "Update Employee Manager", //Bonus
        "View All Roles",
        "Add Role",
        "Remove Role", 
        "View All Departments",
        "Add Department",
        "Remove Department", 
        "View Total Utilized Budget",
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
      case "Remove Department":
        removeDept();
        break;
      case "View Total Utilized Budget":
        totalBudget();
        break;
      case "I'm done.":
        console.log("Thank you for using Employee Tracker.");
        return
    }
  });
}

//ADDITION NEEDED: show manager rather than manager id in future state
function viewAllEmpl(){
  connection.query(
    "SELECT employee.`id`, employee.`first_name`, employee.`last_name`, employee.`manager_id`, role.`title`, role.`salary`, department.`dept_name`  FROM `employee` LEFT JOIN `role` ON employee.`role_id` = role.`id` LEFT JOIN `department` on role.`department_id` = department.`id`", //rather than backtics would use question mark syntax for dynamic replacement
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

//ADDITION NEEDED: show manager rather than manager id in future state
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

//ADDITION NEEDED: sshow manager rather than manager id in future state
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

//ADDITION NEEDED: show manager rather than manager id in future state
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
        connection.query("SELECT * FROM role", function(err,res){
          let roleid = 0;
          if (err) throw err;
          for (let i = 0; i < res.length; i++) {
            if(answer.role === res[i].title){
              roleid = res[i].id;
            }
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
          }); //nested connection end
        });//second connection end
        
      }) // then end
  }); //connection end
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
          if(fullName === answer.emplyDel){
            chosenEmpl = res[i];
            connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?",
            [chosenEmpl.first_name, chosenEmpl.last_name],
            function(err,res){
              if (err) throw err;
            }); //connection to delete end
            console.log(chosenEmpl.first_name + " " + chosenEmpl.last_name+ " has been removed from the system.");
          }; //if statement end
        }// for loop end
      start();
    });//then end
  })
}

function updateEmplRole(){
  connection.query("SELECT * FROM employee", function(err,res){
    if (err) throw err;
    let choiceArray = [];
    for(let i = 0; i < res.length; i++){
      choiceArray.push(res[i].first_name + " " + res[i].last_name);
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "emplyUpd",
          message: "Which employee would you like to update?",
          choices: choiceArray
        },
        {
          type: "input",
          name: "emplyRole",
          message: "What is the employee's new role?"
        }
      ]).then(function(answer){
        connection.query("SELECT * FROM role", function(err,res){
          if (err) throw err;
          //find role id from input
          let roleid;
          for(let i = 0; i < res.length; i++){
            if(answer.emplyRole === res[i].title){
              roleid = res[i].id;
            }
          }
          //need to splice emplyUpd
          let split = answer.emplyUpd.split(" ");
          let firstName = split[0];
          let lastName = split[1];
              connection.query("UPDATE employee SET ? WHERE ? AND ?",
              [ 
                {
                  role_id: roleid
                },
                {
                  first_name: firstName
                },
                {
                  last_name: lastName
                }
              ],
              function(err, res) {
                if (err) throw err;
              }); //update connection end
            }); //connection in then end
        console.log(answer.emplyUpd + "'s role has been updated.");
        start();
      }); //then end
    }); //initial connection end

        
}

//Would include in future state
function updateEmplMang(){

}


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
  connection.query("SELECT * FROM department", function(err,res){
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the role title?"
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?"
        },
        {
          type: "rawlist",
          name: "dept",
          message: "What idepartment does this role fall in?",
          choices: function() {
            let choiceArray = [];
              for(let i = 0; i < res.length; i++){
                choiceArray.push(res[i].dept_name);
              }
              return choiceArray;
          }
        }
      ]).then(function(answer){
          let deptid = 0;
          for (let i = 0; i < res.length; i++) {
            if(answer.dept === res[i].dept_name){
              deptid = res[i].id;
            }
          }
          connection.query("INSERT INTO role SET?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: deptid,
          },
          function(err,res){
            console.log(answer.title + " has been added.");
            start();
          }); //second connection end  
      }) // then end
  }); //connection end
}


function removeRole(){
  connection.query("SELECT * FROM role", function(err,res){
    if (err) throw err;
    inquirer
      .prompt({
        type: "rawlist",
        name: "roleDel",
        message: "Which role would you like to remove?",
        choices: function() {
          let choiceArray = [];
          for(let i = 0; i < res.length; i++){
            choiceArray.push(res[i].title);
          }
          return choiceArray;
      }
      }).then(function(answer){
        let chosenRole;
        for(let i = 0; i < res.length; i++){
          if(res[i].title === answer.roleDel){
            chosenRole = res[i];
            connection.query("DELETE FROM role WHERE title = ?", [chosenRole.title], function(err,res){
              if (err) throw err;
            }); //connection to delete end
            console.log(chosenRole.title + " has been removed from the system.");
          }; //if statement end
        }// for loop end
      start();
    });//then end
  }) //original connection end
}

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
    inquirer
      .prompt([
        {
          type: "input",
          name: "deptName",
          message: "What is the name of the Department?"
        },
      ]).then(function(answer){
          connection.query("INSERT INTO department SET?",
          {
            dept_name: answer.deptName
          },
          function(err,res){
            console.log(answer.deptName + " has been added.");
            start();
          }); //connection end  
      }) // then end
}

function removeDept(){
  connection.query("SELECT * FROM department", function(err,res){
    if (err) throw err;
    inquirer
      .prompt({
        type: "rawlist",
        name: "deptDel",
        message: "Which department would you like to remove?",
        choices: function() {
          let choiceArray = [];
          for(let i = 0; i < res.length; i++){
            choiceArray.push(res[i].dept_name);
          }
          return choiceArray;
      }
      }).then(function(answer){
        let chosenDept;
        for(let i = 0; i < res.length; i++){
          if(res[i].dept_name === answer.deptDel){
            chosenDept = res[i];
            connection.query("DELETE FROM department WHERE dept_name = ?",
            [chosenDept.dept_name],
            function(err,res){
              if (err) throw err;
            }); //connection to delete end
            console.log(chosenDept.dept_name+ " has been removed from the system.");
          }; //if statement end
        }// for loop end
      start();
    });//then end
  })
}

//Function to calculate the "total utilized budget" which in this example is the sum of salaries assuming everyone is hired on Jan 1 and no one leaves ...
function totalBudget(){
  connection.query(
    "SELECT employee.`id`, role.`salary`  FROM `employee` LEFT JOIN `role` ON employee.`role_id` = role.`id`",
    function (err, res){
      let totalBudget = 0;
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        totalBudget = totalBudget +  res[i].salary;
      };
      console.log("The total utilized budget for the current staff is $" + totalBudget +"." );
      start();
    });
}

