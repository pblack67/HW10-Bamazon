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
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT item_id, product_name, price FROM products", (err, result) => {
        if (err) throw err;
        console.table(result);
        takeOrder();
    });
}

function takeOrder() {
    inquirer.prompt(
        [
            {
                name: "item_id",
                type: "input",
                message: "What item id would you like to buy? "
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy? "
            }
        ]
    ).then(answers => {
        console.log(answers);
        buyProduct(answers.item_id, answers.quantity);
    });
}

function buyProduct(item_id, quantity) {
    
}