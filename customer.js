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
    password: "root",
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
            type: 'list',
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

// Ensure that the user is supplying only positive integers for their inputs
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

function order(){
    inquirer.prompt([
        {
            type: 'input',
            name: item_id,
            message: 'Please enter the Item ID that you would like to order!',
            validate: validateInput,
            filter: number
        },
        {
            type: 'input',
            name: item_id,
            message: 'Please enter the Item ID that you would like to order!',
            validate: validateInput,
            filter: number
        }
    ]).then(function(input){
        var item = input.item_id;
        var quantity = input.quantity;

        var queryStr = "SELECT * FROM products WHERE ?";

        connection.query(queryStr, {item_id:item}, function(err, data){
            if(err) throw err;

            // If user insert number that are not a positive integer
            // data empty, reselect id

            if (data.length === 0){
                console.log('ERROR: Invalid Item ID, Please select a valid ID.')
                view();
            }else{
                var productData = data[0];

                //if quantity request by the user are in stock

                if (quantity <= productData.stock_quantity){
                    console.log("The " + productData.product_name + " still has " + productData.stock_quantity + " available.\nHow many would you like to order?");

                    var updateQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(updateQuery, function(err, data){
                        if(err) throw err;

                        console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");
                        
                        inquirer.prompt([
                            {
                                type: 'list',
                                message: 'Would you like to continue shopping on Bamazon?',
                                choices: ['Yes', 'No'],
                                name: 'continue'
                            }
                        ]).then(function(res){
                            if (res.continue === 'Yes'){
                                customer();
                            }else {
                                connection.end();
                            };
                        });
                    });
                }else {
                    console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					view();
                };

            };
        });
    });
};

customer();