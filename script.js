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
    if (err)
        throw err;

    mainMenu();
});

const mainMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View employees",
                "View departments",
                "View roles",
                "Add employee",
                "Add department",
                "Add role",
                "Update employee role",
                "Exit"
            ]
        }
    ]).then(({choice}) => {
		switch(choice) {
            case "View employees":
                viewEmployees();
                break;
            case "View departments":
                viewDepts();
                break;
            case "View roles":
                viewRoles();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "Add department":
				addDept();
                break;
            case "Add role":
                addRole();
                break;
             case "Update employee role":
                updateRole();
                break;
			case "Exit":
				connection.end();
		}
	});
};

// const viewEmployees = () => {

// const viewDepts = () => {

// const viewRoles = () => {

// const addEmployee = () => {

// const addDept = () => {

// const addRole = () => {
    
// const updateRole = () => {