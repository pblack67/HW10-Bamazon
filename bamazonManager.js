const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bootcamp",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    mainMenu();
});

function mainMenu() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'option',
            message: 'What do you want to do?',
            choices: [
              'View Products for Sale',
              'View Low Inventory',
              'Add to Inventory',
              'Add New Product'
            ]
          }
    ).then(answers => {
        console.log(answers);
        mainMenu();
    });
}