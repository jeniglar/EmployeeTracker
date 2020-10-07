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
            choice: [
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


const addDept = () => {
    inquirer.prompt({
			name: "deptName",
			type: "input",
			message: "What is the department name?"
        }).then((answer) => {
		connection.query('INSERT INTO departments(name) VALUES("${answer.deptName}");', function(err, res) {
			if(err)
				throw err;
			console.log("This Department has successfully been added!");
			mainMenu();
		});
	});
};

const addRole = () => {
    const departments =
        inquirer.prompt([
            {   
                name: "title",
                type: "input",
                message: "What is the title of the role?"},
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the role?"},
            {
                name: "departmentId",
                type: "list",
                message: "What department does the role belong to?",
                choices: departments
            }
        ]).then((answers) => {
            connection.query("INSERT INTO roles(title, salary, departmentId) VALUES(?, ?, ?)",  function(err, postData) {
                if(err)
                    throw err;
                console.log("This role has successfully been added!");
    
                mainMenu();
            });
        });
    };

const addEmployee = () => {
    const roles = 
    const managers = 
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "roleId",
            type: "list",
            message: "What is the employee's role?",
            choices: roles
        }
        {
            name: "managerId",
            type: "list",
            message: "Who is the employee's manager?",
            choices: managers
        }
    ]).then((answers) => {
        connection.query("INSERT INTO employees(firstName, lastName, roleId, managerId) VALUES(?, ?, ?)", function(err, postData) {
            if(err)
                throw err;
            console.log("This Employee has successfully been added!");

            mainMenu();
        });
    });
};

// const viewEmployees = () => {

// const viewDepts = () => {

// const viewRoles = () => {
    
// const updateRole = () => {