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
    );
}


// // Create connection & load the products
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    init();
    loadProducts();
    // connection.end();
});

function loadProducts() {
    connection.query('SELECT * FROM products', function(error, response) {
        let content = [];
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
        console.log("\n" + table.toString())

    })

}

// function loadProducts() {
//     connection.query("SELECT * FROM products", function(err, res) {
//         if (err) throw err;

//         // for (i = 0; i < res.length; i++) {
//         //     let product = res[i];
//         //     console.log(product)
//         //         //             table.push(`Product ID: ${product.id}, ${product.product_name}, $${product.price}`);


//         //     //             console.log(table);

//         //     //             // console.log(`Product ID: ${product.id}`);
//         //     //             // console.log(`Product Name: ${product.product_name}`)
//         //     //             // console.log(`Price: $${product.price}`)
//         //     //             // console.log("-----------------------------------");
//         // }
//         //         console.log(`\n\n${table.toString()}\n\n`);
//     })
// }


// // function runSearch() {
// //     inquirer
// //         .prompt({
// //             name: "action",
// //             type: "list",
// //             message: "What would you like to do?",
// //             choices: [
// //                 "Find songs by artist",
// //                 "Find all artists who appear more than once",
// //                 "Find data within a specific range",
// //                 "Search for a specific song",
// //                 "exit"
// //             ]
// //         })
// //         .then(function(answer) {
// //             switch (answer.action) {
// //                 case "Find songs by artist":
// //                     artistSearch();
// //                     break;

// //                 case "Find all artists who appear more than once":
// //                     multiSearch();
// //                     break;

// //                 case "Find data within a specific range":
// //                     rangeSearch();
// //                     break;

// //                 case "Search for a specific song":
// //                     songSearch();
// //                     break;

// //                 case "exit":
// //                     connection.end();
// //                     break;
// //             }
// //         });
// // }

// console.reset = function() {
//     return process.stdout.write('\033c');
// }