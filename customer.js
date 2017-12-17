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

// Customer's interface and option
// Should include option to view available item list, option to make the purchase, and return to main menu

var customer = function(){
    inquirer.prompt([
        {
            type: 'list',
            message: '\nWhat would you like to do?\n',
            choices: options,
            name: 'customer'
        }
    ]).then(function(res){
        if(res.customer === options[0]){
            view();
        }else if (res.customer === options[1]){
            order();
        }else if (res.customer === options[2]){
            var intro = require('./intro');
            intro();
        };
    });
};


// function for view

function view() {
    inquirer.prompt([
        {
            type: 'list';
            message: '\nSort By: ',
            // option for sorting by methods
            choices: ['Department', 'Price (ascending)', 'Price (descending)'],
            name: 'customer'
        }
    ]).then(function(res){
        // if sort by department
        if (res.options === 'Department') {
            connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY department_name", function(err, results) {
                if (err) throw err;
                console.log(
                    "\n" + 
                    Table.print(results, {
                        item_id: {name: "Product ID"},
                        product_name: {name: "Product Name"},
                        department_name: {name: "Department"},
                        price: {name: "Price ($)", printer: Table.number(2)},
                        stock_quantity: {name: "Stock Quantity"}
                    })
                );
                customer();
            });
            // if order by price normal
        }else if(res.options === 'Price (ascending)'){
            connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY price", function(err, results) {
                if (err) throw err;
                console.log(
                    "\n" + 
                    Table.print(results, {
                        item_id: {name: "Product ID"},
                        product_name: {name: "Product Name"},
                        department_name: {name: "Department"},
                        price: {name: "Price ($)", printer: Table.number(2)},
                        stock_quantity: {name: "Stock Quantity"}
                    })
                );
                customer();
            });
            // if order by price desc
        }else if (res.option === 'Price (descending)'){
            connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY price DESC", function(err, results) {
                if (err) throw err;
                console.log(
                    "\n" + 
                    Table.print(results, {
                        item_id: {name: "Product ID"},
                        product_name: {name: "Product Name"},
                        department_name: {name: "Department"},
                        price: {name: "Price ($)", printer: Table.number(2)},
                        stock_quantity: {name: "Stock Quantity"}
                    })
                );
                customer();
            });
        }
    });
};

