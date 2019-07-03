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
    makePurchase();
    // connection.end();
});

let content = [];
let contentQuantity = [];

// function loadProducts() {
//     connection.query('SELECT * FROM products', function(error, response) {
//         var table = new Table({
//             head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity'],
//             style: {
//                 head: [] //disable colors in header cells
//                     ,
//                 border: [] //disable colors for the border
//             },
//             colWidths: [20, 45, 30, 12, 12] //set the widths of each column (optional)
//         });

//         response.forEach(function(row) {
//             // var q = row.stock_quantity;
//             let newRow = [row.id, row.product_name, row.department_name, "$" + row.price, row.stock_quantity]
//             table.push(newRow)
//             content.push(row.stock_quantity)
//         })
//         console.log(row.id)
//         console.log(row.stock_quantity)
//         console.log("\n" + table.toString());
//         makePurchase();
//     })
// }

function makePurchase() {
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
                content.push(row.id);
                contentQuantity.push(row.stock_quantity);
            })
            console.log("\n" + table.toString());
        })
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
                            name: "id",
                            type: "number",
                            message: "What is the item ID of the product you would like to purchase?",
                            validate: function(input) {
                                if (Number.isInteger(parseInt(input)) === true && (content.indexOf(parseFloat(input)) !== -1)) {
                                    return true;
                                } else console.log("\nPlease enter a valid item ID to continue.")
                            }
                        }, {
                            name: "quantity",
                            type: "number",
                            message: "How many would you like?",
                            validate: function(input) {
                                if (Number.isInteger(parseInt(input)) === true) {
                                    return true
                                } else console.log("\nPlease enter the number of units you would like to purchase.")
                            }
                        },

                    ]).then(selection => {
                        const product = parseInt(selection.id);
                        const quantity = parseInt(selection.quantity);

                        // place order for product with given id and given units to purchase
                        placeOrder(product, quantity);
                    });
            }
            //         ]).then(function(answer) {
            //             var quantityNeeded = answer.quantity;
            //             var IDrequested = answer.itemID;
            //             // purchaseOrder(IDrequested, quantityNeeded)
            //             // console.log(content);



            //             if (contentQuantity[0] - quantityNeeded < 0) {
            //                 console.log("insufficient quantity in our store");
            //             } else if (contentQuantity[1] - quantityNeeded < 0) {
            //                 console.log("insufficient quantity in our store");
            //             } else {
            //                 console.log("purchase successful")
            //             }

            //             connection.end();
            //         })
            // } else {
            //     console.log('Thanks for visiting Bamazon');
            //     connection.end();
            // }
        })

}

const placeOrder = function(product, quantity) {
    // query database for product
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, product.item_id],
        function(error, response) {
            console.log("Thank you for your purchase of " + quantity + " " + product + "'s!");

        }
    )
}