var mysql = require("mysql");
var inquirer = require("inquirer");
var util = require("util");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "ghm766",
    database: "employee_db"
});

//--- Must bind the promise to the original object context to use the connection.
var connectProm = util.promisify(connection.connect).bind(connection);
var queryProm = util.promisify(connection.query).bind(connection);

connection.connect(function (err) {
    if (err) throw err;
    starter();
});

function starter() {
    inquirer
        .prompt({
            name: "input",
            type: "selection",
            message: "Let's start!",
            choices: [
                "View departments",
                "view employees",
                "view roles",
                "Add a department",
                "Add an employee",
                "Add a role",
                "Update an employee's role",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View departments":
                    viewdpartments();
                    break;

                case "view employees":
                    viewEmployees();
                    break;

                case "view roles":
                    viewroles();
                    break;

                case "Add a department":
                    addDepartment();
                    break;

                case "Add an employee":
                    addEmployee();
                    break;

                case "Add a role":
                    addRole();
                    break;

                case "Update an employee's role":
                    updateEmployeeRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        })

}

async function getDepartments() {
    const data = await connection.query
        ("SELECT * FROM departments");
    return data;
};
async function getRoles() {
    const data = await connection.query
        ("SELECT * FROM roles")
    return data;
};
async function getEmployees() {
    const data = await connection.query
        ("SELECT * FROM employees")
    return data;
};
async function createDepartment(department) {
    const data = await connection.query
        ('INSERT INTO department (department_name) VALUES ("Sales"), ("Finance"), ("Developer"), ("Legal")')

};
async function createRole(role) {
    const data = await connection.query
        ('INSERT INTO role (title, salary, department_id) VALUES ("Sales Rep", 75000, 2), ("Accountant", 80000, 1), ("Full Stack Developer", 100000, 3), ("Attorney",  120000, 2), ("Office Admin", 47000,3);')

};
async function createEmployee(employee) {
    const datat = await connection.query
        ('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Leslie", "Perez", 1, null), ("Cindy", "Smith", 2, 234), ("Paul", "Miller", 3, 345), ("Judy", "Sanchez", 4, null);')

};
async function updateEmployee(employee) {

};





