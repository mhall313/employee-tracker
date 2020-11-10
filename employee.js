const mysql = require("mysql");

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
  });

class Employee {
    constructor(first_name, last_name){
        this.first_name = first_name;
        this.last_name = last_name;
    }

    async getEmployee() {
        let firstName =  this.first_name;
        let lastName = this.last_name;
        connection.query(
            "SELECT * FROM employee WHERE first_name = ? AND last_name = ?", [firstName, lastName] ,function (err, res){
              if (err) throw err;
              console.log("1" + res);
              return res;              
            });
        console.log(result);
    }
}

module.exports = Employee;