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
            content.push(row.id)
        })
        console.log("\n" + table.toString());
        makePurchase();
    })
}

function makePurchase() {
    // ask user if they want to purchase something
    inquirer
        .prompt([

            {
                name: "purchase",
                type: "list",
                message: "Would you like to purchase an item?",
                choices: ["Yes", "No"]
            },

        ]).then(function(answer) {
            if (answer.purchase === "Yes") {
                inquirer
                    .prompt([{
                            name: "itemId",
                            type: "number",
                            message: "What is the item ID of the product you would like to purchase?",
                            validate: function(input) {
                                if (Number.isInteger(parseInt(input)) === true && (content.indexOf(parseFloat(input)) !== -1)) {
                                    return true;
                                } else console.log("\nPlease enter a valid item ID to continue.")
                            }
                        }, {
                            name: "quantity",
                            type: "input",
                            message: "How many would you like?",
                            validate: function(input) {
                                if (Number.isInteger(parseInt(input)) === true) {
                                    return true
                                } else console.log("\nPlease enter the number of units you would like to purchase.")
                            }
                        },

                    ]).then(function(answer) {
                        var quantityNeeded = answer.Quantity;
                        var IDrequested = answer.ID;
                        purchaseOrder(IDrequested, quantityNeeded)

                    })
            }
        })

}