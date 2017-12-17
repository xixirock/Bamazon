// Dependencies

var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("easy-table");

// Options for customer's interface
var options = [
    "View items for sale",
    "Place an order",
    "Back to Main Menu"
];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "",
    database: "Bamazon"
});

connection.connect(function(err, res){
    if (err) throw err; 
    // connection test
    //console.log('listening to port: ' + res);
});



