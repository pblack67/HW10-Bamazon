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
        switch (answers.option) {
            case 'View Products for Sale':
                viewProducts();
                break;

            case 'View Low Inventory':
                viewLowInventory();
                break;

            case 'Add to Inventory':
                addInventory();
                break;

            case 'Add New Product':
                addNewProduct();
                break;
        }
    });
}

function viewProducts() {
    connection.query(`
    SELECT item_id AS 'Item ID',
    product_name AS 'Product Name',
    department_name AS 'Department Name',
    price AS 'Price',
    stock_quantity AS 'Stock Quantity',
    product_sales AS 'Product Sales'
    FROM products`, (err, result) => {
            if (err) throw err;
            console.table(result);
            mainMenu();
        })
}

function viewLowInventory() {
    connection.query(`
        SELECT item_id AS 'Item ID',
        product_name AS 'Product Name',
        department_name AS 'Department Name',
        price AS 'Price',
        stock_quantity AS 'Stock Quantity',
        product_sales AS 'Product Sales'
        FROM products
        WHERE stock_quantity < 5`,
        (err, result) => {
            if (err) throw err;
            console.table(result);
            mainMenu();
        })
}

function addInventory() {
    inquirer.prompt(
        [
            {
                name: "item_id",
                type: "input",
                message: "What item id would you like to add inventory to? "
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "What is the updated stock quantity? "
            }
        ]
    ).then(answers => {
        updateInventory(answers.item_id, answers.stock_quantity);
    });
}

function updateInventory(item_id, stock_quantity) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity
            },
            {
                item_id
            }
        ],
        (err, result) => {
            if (err) throw err;
            mainMenu();
        }
    );
}

function addNewProduct() {
    inquirer.prompt(
        [
            {
                name: "product_name",
                type: "input",
                message: "Product Name? "
            },
            {
                name: "department_name",
                type: "input",
                message: "Department Name?"
            },
            {
                name: "price",
                type: "input",
                message: "Product Price?"
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "Quantity in Stock?"
            }
        ]
    ).then(answers => {
        addProduct(answers.product_name, answers.department_name, answers.price, answers.stock_quantity);
    });
}

function addProduct(product_name, department_name, price, stock_quantity) {
    connection.query(
        "INSERT INTO products SET ?",
        {
            product_name,
            department_name,
            price,
            stock_quantity
        },
        (err, result) => {
            if (err) throw err;
            mainMenu();
        }
    );
}