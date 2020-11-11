DROP DATABASE IF EXISTS et_DB;
CREATE DATABASE et_DB;

USE et_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Melanie", "Hall", 1, NULL), 
("Roberto", "Rubet", 1, NULL), 
("Jon", "Deavers", 2, NULL), 
("Jim", "Doyle", 3, NULL), 
("Justin", "Psomething", 3, 6), 
("Josh", "Allan", 4, NULL), 
("Tanner", "Kirkpatrick", 6, NULL), 
("Dylan", "Frank", 5, 7), 
("Elisabeth", "Clumpkins", 1, NULL), 
("Christine", "Moore", 1, NULL);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 80000, 2), 
("Accountant", 50000, 4), 
("Sales Person", 30000, 1), 
("Sales Lead", 40000, 1), 
("Legal Team Lead", 90000, 3), 
("Lawyer", 100000, 3);

INSERT INTO department (dept_name)
VALUES ("Sales"),
("Engineering"),
("Legal"),
("Finance");
