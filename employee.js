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
  database: "employeeDB"
});

//--- Must bind the promise to the original object context to use the connection.
var connectProm = util.promisify(connection.connect).bind(connection);
var queryProm = util.promisify(connection.query).bind(connection);


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
function createDepartment(department) {

};
function createRole(role) {

};
function createEmployee(employee) {

};
function updateEmployee(employee) {

};





// arrays for prompts:
var initialPrompt = [
    {
        type: "input",
        name: "selection",
        message: "Let's Start",
        choices: [
            "Add Employee", 
            "View all Employees", 
            "Remove Employee",
            "Add Department", 
            "View all Departments",
            "Add Roles", 
            "View all Roles", 
            "Update Employee Role", 
            "Exit"
          ]
    }
];

var newItemPrompts = [
    {
        type: "input",
        name: "name",
        message: "Enter item name: "
    },
    {
        type: "input",
        name: "description",
        message: "Enter item description: "
    },
    {
        type: "input",
        name: "currentBid",
        message: "Enter starting bid: "
    }
];

var selectItemPrompt = [
    {
        type: "input",
        name: "id",
        message: "Enter ID of item you would like to bid on: "
    },
    {
        type: "input",
        name: "bid",
        message: "How much would you like to bid? "
    }
]

main();

// Main loop
async function main() {
    try {
        await connectProm();

        var quit = false;
        while (!quit) {
            //Prompt to Bid or Post
            var { selection } = await inquirer.prompt(initialPrompt);
            switch (selection.toLowerCase()) {
                case "p":
                    await postNewItem();
                    break;
                case "b":
                    await makeBid();
                    break;
                case "x":
                    quit = true;
                    break;
                default:
                    break;
            }
        }
    } catch (err) {
        throw err;        
    }

    //--- be sure to close the connection when done.
    connection.end();
}

// function to prompt user for new Item details
async function postNewItem() {
    var data  = await inquirer.prompt(newItemPrompts);
    var itm = {
        name: data.name,
        description: data.description,
        currentBid: data.currentBid
    };
    await postItem(itm);
}

// function to list items for sale and get selection and bid from user
async function makeBid() {
    try {
        await displayItems();
        var { id, bid } = await inquirer.prompt(selectItemPrompt);
        await tryBid(id, bid);
    } catch (err) {
        throw err;
    }
}

// function to check the bid, update if bid is higher
async function tryBid(itemId, bid) {
    try {
        var res = await queryProm("UPDATE itemsForSale SET currentBid = ? WHERE id = ? AND currentBid < ?",
        [
            bid,
            itemId,
            bid
        ]);
    
        if(res.affectedRows !== 1) {
            console.log("Sorry, you didn't bid high enough!");
        } else {
            console.log("Success!  Your bid has been placed!");
        }
    } catch (err) {
        throw err;
    }
}

// CRUD functions
async function postItem(obj) {
    try {
        var res = await queryProm("INSERT INTO itemsForSale SET ?", obj);
    } catch (err) {
        throw err;
    }
}

async function displayItems() {
    try {
        var res = await queryProm("SELECT * FROM itemsForSale");
        console.log(`ID |   Name    |   Description`);
        for (var i = 0; i < res.length; i++) {
            console.log(`${res[i].id}  | ${res[i].name} | ${res[i].description}` )
        }
    } catch (err) {
        throw err;
    }
}