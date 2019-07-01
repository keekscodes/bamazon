// Initializes the npm packages used
require("dotenv").config();
console.log(require("dotenv").config());
var mysql = require("mysql");
var inquirer = require("inquirer");


// // Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// // Create connection & load the products
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    loadProducts();
    connection.end();
});

function loadProducts() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let product = res[i];
            console.log(`Product ID: ${product.id}`);
            console.log(`Product Name: ${product.product_name}`)
            console.log(`Price: ${product.price}`)
            console.log("-----------------------------------");
        }
    });

}

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Find songs by artist",
                "Find all artists who appear more than once",
                "Find data within a specific range",
                "Search for a specific song",
                "exit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "Find songs by artist":
                    artistSearch();
                    break;

                case "Find all artists who appear more than once":
                    multiSearch();
                    break;

                case "Find data within a specific range":
                    rangeSearch();
                    break;

                case "Search for a specific song":
                    songSearch();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}