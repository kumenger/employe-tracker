const inquirer = require("inquirer");
const questions = [{
    type: 'list',
    name: 'task',
    message: 'What would you like to do?',
    choices: [
     new inquirer.Separator(),
        'View all employees',
        'View all roles',
        'View all departments',
       new inquirer.Separator(),
        'Add employee',
        'Add role',
        'Add department',
        new inquirer.Separator(),
        'Update employee',
        new inquirer.Separator(),
        'Delete employee',
        'Delete role',
        'Delete department',
        new inquirer.Separator(),
    ],
    pageSize: 28
   
}];
const addDepartment=[{
    type:"input",
    name:"depName",
    message:"What is the Name of Department?"
}]

module.exports={questions,addDepartment}