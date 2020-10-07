require("dotenv").config();

const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PASS,
    database: "employeeTracker_db"
});

connection.connect(err => {
    if(err)
        throw err;
});

const mainMenu = [
    {
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: [
            "Add department",
            "View departments",
            "Add role",
            "View roles",
            "Add employee",
            "View employees",
            "Update employee role",
            "Exit"
        ]
    }
];


// function to initialize main menu
function init() {
    inquirer.prompt(mainMenu).then(function(answers) {
})};


init();

