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
                'View Departments',
                'Create New Department'
            ]
        }
    ).then(answers => {
        switch (answers.option) {
            case 'View Product Sales by Department':
                viewSalesByDepartment();
                break;

            case 'View Departments':
                viewDepartments();
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

function viewDepartments() {
    connection.query("SELECT * FROM departments",
        (err, result) => {
            if (err) throw err;
            console.table(result);
            mainMenu();
        }
    )
}

function createNewDepartment() {
    inquirer.prompt(
        [
            {
                name: "department_name",
                type: "input",
                message: "Department Name?"
            },
            {
                name: "over_head_costs",
                type: "input",
                message: "Overhead Costs?"
            }
        ]
    ).then(answers => {
        addDepartment(answers.department_name, answers.over_head_costs);
    });
}

function addDepartment(department_name, over_head_costs) {
    connection.query(
        "INSERT INTO departments SET ?",
        {
            department_name,
            over_head_costs
        },
        (err, result) => {
            if (err) throw err;
            mainMenu();
        }
    );
}
