DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE departments(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10, 2) NOT NULL, 
departmentId INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (departmentId) REFERENCES departments(id)
);

CREATE TABLE employees(
id INT NOT NULL AUTO_INCREMENT,
firstName VARCHAR(30) NOT NULL,
lastName VARCHAR(30) NOT NULL,
roleId INT NOT NULL,
managerId INT,
PRIMARY KEY (id),
FOREIGN KEY (roleId) REFERENCES roles(id)
);

