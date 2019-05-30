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
                'View Product Sales by Department',
                'Create New Department'
            ]
        }
    ).then(answers => {
        switch (answers.option) {
            case 'View Product Sales by Department':
                viewSalesByDepartment();
                break;

            case 'Create New Department':
                createNewDepartment();
                break;
        }
    });
}

function viewSalesByDepartment() {
    mainMenu();
}

function createNewDepartment() {
    mainMenu();
}
