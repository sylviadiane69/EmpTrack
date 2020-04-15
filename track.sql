DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE role(
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(30.3),
  department_id INTEGER(10),
  PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(10),
    manager_id INTEGER(10),
    PRIMARY KEY(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


