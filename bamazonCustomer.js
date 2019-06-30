// read and set environment variables with the dotenv package
require("dotenv").config();

var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bamazon_db"
})