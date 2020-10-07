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
    ]).then(({ choice }) => {
        switch (choice) {
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


const viewEmployees = () => {
    connection.query("SELECT * FROM employees LEFT JOIN roles ON employees.roleId = roles.id LEFT JOIN departments ON roles.departmentId = departments.id", function (err, res) {
        if (err)
            throw err;
        console.log("All Employees");
        console.table(res);
        mainMenu();
    });
};

const viewDepts = () => {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err)
            throw err;
        console.log("Departments");
        console.table(res);
        mainMenu();
    });
};

const viewRoles = () => {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err)
            throw err;
        console.log("Roles");
        console.table(res);
        mainMenu();
    });
};

const addDept = () => {
    inquirer.prompt({
        name: "deptName",
        type: "input",
        message: "What is the department name?"
    }).then((answer) => {
        connection.query('INSERT INTO departments(name) VALUES(?)', answer.deptName, function (err, res) {
            if (err)
                throw err;
            console.log(answer.deptName + " has successfully been added!");
            viewDepts();
            mainMenu();
        });
    });
};

const addRole = () => {
    connection.query("SELECT id, name FROM departments", function (err, res) {
        const departmentNames = (res.map(({ id, name }) => name));
        // console.log(res);
        const departmentsList = (res.map(({ id, name }) => id + "," + name));
        // console.log(departmentNames);
        // console.log(departmentsList);
        const departments = {};
        departmentsList.forEach(department => {
            // console.log(department);
            const d = department.split(",");
            departments[d[1]] = d[0];
        })
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the role?"
            },
            {
                name: "departmentId",
                type: "list",
                message: "Which department does the role belong to?",
                choices: departmentNames
            }
        ]).then((answer) => {
            connection.query("INSERT INTO roles(title, salary, departmentId) VALUES(?, ?, ?)", [answer.title, parseInt(answer.salary), departments[answer.departmentId]], function (err, postData) {
                if (err)
                    throw err;
                console.log(answer.title + " has successfully been added!");
                mainMenu();
            });
        });
    });
};

const addEmployee = () => {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err)
            throw err;
        const employees = res.map(({ firstName, lastName, id }) => ({
            name: firstName + " " + lastName,
            value: id
        }))
        connection.query("SELECT * FROM roles", function (err, res) {
            if (err)
                throw err;
            const roles = res.map(({ title, id }) => ({
                name: title,
                value: id
            }))
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
                },
                {
                    name: "managerId",
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: employees
                }
            ]).then((answer) => {
                connection.query("INSERT INTO employees(firstName, lastName, roleId, managerId) VALUES(?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleId, answer.managerId], function (err, postData) {
                    if (err)
                        throw err;
                    console.log(answer.firstName + answer.lastName + " has successfully been added!");
                    viewEmployees();
                    mainMenu();
                });
            });
        });
    });
};

const updateRole = () => {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err)
            throw err;
        const employeeList = res.map(({ firstName, lastName, id }) => ({
            name: firstName + " " + lastName,
            value: id
        }))
        connection.query("SELECT * FROM roles", function (err, res) {
            if (err)
                throw err;
            const roleList = res.map(({ title, id }) => ({
                name: title,
                value: id
            }))
            inquirer.prompt([
                {
                    name: "selectedEmployee",
                    type: "list",
                    message: "Which employee's role would you like to update?",
                    choices: employeeList
                },
                {
                    name: "newRole",
                    type: "list",
                    message: "What is the employee's new role?",
                    choices: roleList
                }
            ]).then((answer) => {
                connection.query("UPDATE employees SET roleId=answer.newRole WHERE id=answer.selectedEmployee", function (err, postData) {
                    if (err)
                        throw err;
                    console.log("This role has successfully been updated!");
                    mainMenu();
                });
            });
        });
    });
};