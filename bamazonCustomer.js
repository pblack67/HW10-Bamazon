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
        buyProduct(answers.item_id, answers.quantity);
    });
}

function buyProduct(item_id, quantity) {
    connection.query(
        "SELECT stock_quantity, price, product_sales FROM products WHERE ?",
        {
            item_id
        },
        (err, result) => {
            if (err) throw err;
            let stock_quantity = result[0].stock_quantity;
            let price = result[0].price;
            let product_sales = result[0].product_sales;
            if (quantity > stock_quantity) {
                console.log(`Insufficient quantity, only ${stock_quantity} items available!`);
                displayProducts();
            } else {
                console.log(`Your ${quantity} items will be shipped to you immediately!`);
                updateStockQuantity(item_id, stock_quantity - quantity, product_sales + quantity * price);
            }
        }
    );
}

function updateStockQuantity(item_id, stock_quantity, product_sales) {
    connection.query(
        "UPDATE products SET ?, ? WHERE ?",
        [
            {
                stock_quantity
            },
            {
                product_sales
            },
            {
                item_id
            }
        ],
        (err, result) => {
            if (err) throw err;
            displayProducts();
        }
    );
}
