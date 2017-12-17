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

var option = ['Customer', 'Manager', 'Supervisor', 'Nope, see ya.'];

function intro() {
    console.log('\n--------------------------------------------\n');
    console.log('Welcome to Bamazon, your portal to the best headphones of the world!\n Have fun Shopping!')
    console.log('\n--------------------------------------------\n');
    inquirer.prompt([
        {
            type:'list',
            choice: options,
            message: 'You are our:\n',
            name: 'login'
        }
    ]),then(function(res){
        if(res.login = options[0]){
            customer();
        }else if (res.login = options[1]){
            manager();
        }else if (res.login = options[2]){
            supervisor();
        }else if (res.login = options[3]){
            return;
        };
    });
    
};


module.exports = intro;

intro();