// Initializes the npm packages used
require("dotenv").config();
// console.log(require("dotenv").config());
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");
var figlet = require("figlet");
var Table = require("cli-table3");


// // Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


const init = () => {
    console.log(
        chalk.whiteBright(
            figlet.textSync("BAMAZON", {
                font: "Star Wars",
                horizontalLayout: "full",
                verticalLayout: "default"
            })
        )
    )
}


// // Create connection & load the products
connection.connect(function(error) {
    if (error) throw error;
    // console.log("connected as id " + connection.threadId + "\n");
    init();
    loadProducts();
    // connection.end();
});

let content = [];
let contentQuantity = [];

function loadProducts() {
    connection.query('SELECT * FROM products', function(error, response) {
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity'],
            style: {
                head: [] //disable colors in header cells
                    ,
                border: [] //disable colors for the border
            },
            colWidths: [20, 45, 30, 12, 12] //set the widths of each column (optional)
        });

        response.forEach(function(row) {
            let newRow = [row.id, row.product_name, row.department_name, "$" + row.price, row.stock_quantity]
            table.push(newRow)
            content.push(row.stock_quantity)
        })
        console.log("\n" + table.toString());
        shop(response);
    })
}

function shop() {
    inquirer.prompt([{
            name: "id",
            type: "input",
            message: "Please enter the Item ID of the product you would like to purchase",
            filter: Number
        },
        {
            name: "quantity",
            type: "input",
            message: "How many items would you like to purchase?",
            filter: Number
        },

    ]).then(function(answers) {
        var quantityNeeded = answers.quantity;
        var idReq = answers.id;
        placeOrder(idReq, quantityNeeded);
    });
};


function placeOrder(ID, amount) {
    connection.query('Select * FROM products WHERE id = ' + ID, function(error, response) {
        if (error) throw error;
        if (amount <= response[0].stock_quantity) {
            var totalCost = response[0].price * amount;
            console.log("Good news your order is in stock!");
            console.log("Your total cost for " + amount + " " + response[0].product_name + " is " + "$" + totalCost + " Thank you!");

            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amount + "WHERE id = " + ID);
        } else console.log("Sorry, insufficient quantity of the " + response[0].product_name + " to complete your order.");
        shop();
    });
};