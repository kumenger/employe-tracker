DROP DATABASE IF EXISTS employeTracker_db;
CREATE DATABASE employeTracker_db;

USE employeTracker_db;

CREATE TABLE departments (
  dep_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dep_name VARCHAR(30) NOT NULL NOT NULL
);
CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(30) NOT NULL,
  dep_name VARCHAR(30),
  FOREIGN KEY(dep_name) REFERENCES departments(dep_id)
  salary DECIMAL NOT null
);

CREATE TABLE employe (
  employe_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_name VARCHAR(30),
  FOREIGN KEY(role_name) REFERENCES roles(role_id)
  manager_name VARCHAR(30) 
   
);

         ,(err,res)=>{
                   
                

