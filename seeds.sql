USE employeeTracker_db;

INSERT INTO departments(name) 
VALUES
    ("Sales"),
    ("Engineerng"),
    ("Finance"),
    ("Legal");

INSERT INTO roles(title, salary, departmentId) 
VALUES
    ("Sales Lead", 100000, 1),
    ("Lead Engineer", 140000, 2),
    ("Accountant", 120000, 3),
    ("Lawyer", 175000, 4);

INSERT INTO employees(firstName, lastName, roleId, managerId) 
VALUES
    ("Sam", "McSammy", 1, 1),
    ("Johnny", "John", 2, 2),
    ("Sally", "Seashell", 3, NULL),
    ("Forrest", "Gump", 4, NULL);


