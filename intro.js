//Info in regards to password and login
//Manager: Username => Josh; password => josh;
//Supervisor: Username => Sho; password => sho;


//Include requires

var inquirer = require ('inquirer');
var mysql = require ('mysql');

//Variables
var customer = require("./customer");
var manager = require("./manager");
var supervisor = require("./supervisor");

//Options for user intro interface 

var options = ['Customer', 'Manager', 'Supervisor', 'Nope, see ya.'];

function quit() {
	console.log("\n-------------------------------------------------\n");
	console.log("Thanks for visiting Bamazon. See you next time.");
	console.log("\n-------------------------------------------------\n");
	process.exit();
};

function intro() {
    console.log('\n--------------------------------------------\n');
    console.log('Welcome to Bamazon, your portal to the best headphones of the world!\nHave fun Shopping!')
    console.log('\n--------------------------------------------\n');
    inquirer.prompt([
        {
            type: 'list',
            choices: ['Customer', 'Manager', 'Supervisor', 'Nope, see ya.'],
            message: 'You are our:\n',
            name: 'login'
        }
    ]).then(function(res){
        if(res.login === 'Customer'){
            customer();
        }else if (res.login === 'Manager'){
            manager();
        }else if (res.login === 'Supervisor'){
            supervisor();
        }else if (res.login === 'Nope, see ya.') {
            quit();
        };
    });
    
};


module.exports = intro;

intro();