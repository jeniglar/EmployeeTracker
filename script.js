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
    ]).then(({choice}) => {
		switch(choice) {
            case "Add department":
				addDept();
                break;
            case "View departments":
                viewDepts();
                break;
            case "Add role":
                addRole();
                break;
            case "View roles":
                viewRoles();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "View employees":
                viewEmployees();
                break;
             case "Update employee roles":
                updateRoles();
                break;
			case "Exit":
				connection.end();
		}
	});
};
