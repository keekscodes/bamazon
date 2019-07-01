// Initializes the npm packages used
require("dotenv").config();
console.log(require("dotenv").config());
var mysql = require("mysql");
// var inquirer = require("inquirer");
// var keys = require("./keys")
//     // var Connection = new mysql(keys.Connection);


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
            console.log(`Product Name: ${product.product_name}`)
            console.log(`Price: ${product.price}`)
            console.log("-----------------------------------");
        }
    });

}