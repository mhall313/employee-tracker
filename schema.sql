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
VALUES ("Melanie", "Hall", 100, NULL), 
("Roberto", "Rubet", 100, NULL), 
("Jon", "Deavers", 200, NULL), 
("Jim", "Doyle", 200, NULL), 
("Justin", "Psomething", 300, 6), 
("Josh", "Allan", 301, NULL), 
("Tanner", "Kirkpatrick", 401, NULL), 
("Dylan", "Frank", 400, 7), 
("Elisabeth", "Clumpkins", 100, NULL), 
("Christine", "Moore", 100, NULL);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 80000, 100), 
("Accountant", 50000, 200), 
("Sales Person", 30000, 300), 
("Sales Lead", 40000, 301), 
("Legal Team Lead", 90000, 401), 
("Lawyer", 100000, 400);
