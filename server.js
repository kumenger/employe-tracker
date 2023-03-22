const inquirer = require("inquirer");
const { questions, addDepartment } = require("./helpers/questions");
const cTable = require("console.table");
const mysql = require("mysql2");
require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },

  console.log(`Connected to the employeTracker_db database.`)
);
const showData = async () => {
  await inquirer
    .prompt(questions)
    .then((answer) => {
      const todo = answer.task;
      if (todo === "View all employees") {
        (() => {
          db.query(
            "select * from employe INNER JOIN roles ON roles.role_name=employe.role_name;",
            (err, res) => {
              if (err) {
                console.log(err);
              }
              console.log("\n");
              console.table(res);
              showData();
            }
          );
        })();
      } else if (todo === "View all roles") {
        (() => {
          db.query(
            "select * from roles INNER JOIN departments ON departments.dep_name=roles.dep_name",
            (err, res) => {
              if (err) {
                console.log(err);
              }
              console.log("\n");
              console.log(res)
              console.table(res);
              showData();
            }
          );
        })();
      } else if (todo === "View all departments") {
        (() => {
          db.query("select * from departments", (err, res) => {
            if (err) {
              console.log(err);
            }
            console.log("\n");
            
            console.table(res);
            showData();
          });
        })();
      } else if (todo === "Add employee") {
        db.query('select * from roles',(err,res)=>{
            if(err){console.log(err)}
            let myarr=[]
            res.forEach(element => {
                myarr.push(element.role_name)
            });
           
            inquirer.prompt([{
                type:"input",
                name:"first_name",
                message:"employe first name?"
            },
            {
                type:"input",
                name:"last_name",
                message:"employe last name?"
            },{
                type:"list",
                name:"role_name",
                message:"Employe role will be?",
                choices:myarr
            },{
                type:"input",
                name:"manager_name",
                message:"Employe manager name?",
              
            }]).then((data)=>{

                db.query(
            `INSERT INTO employe (${Object.keys(data).join(",")}) 
             values (${Object.values(data).map((x)=>`"${x}"`).join(",")})`,
                  (err, res) => {
                    if (err) {
                      console.log(err);
                    }
                    console.log("\n");
                    console.table(res);
                    showData();
                  }
                )

            })

        })
      } else if (todo === "Add role") {
        db.query('select * from departments',(err,res)=>{
            if(err){console.log(err)}
            let myarr=[]
            res.forEach(element => {
                myarr.push(element.dep_name)
            });
           
            inquirer.prompt([{
                type:"input",
                name:"role_name",
                message:"What is the Name of role?"
            },{
                type:"list",
                name:"dep_name",
                message:"What department this role belong to ?",
                choices:myarr
            },{
                type:"input",
                name:"salary",
                message:"what is the salary of this role will be ?",
              
            }]).then((data)=>{

                db.query(
            `INSERT INTO roles (${Object.keys(data).join(",")}) 
             values (${Object.values(data).map((x)=>`"${x}"`).join(",")})`,
                  (err, res) => {
                    if (err) {
                      console.log(err);
                    }
                    console.log("\n");
                    console.table(res);
                    showData();
                  }
                )

            })

        })
      } else if (todo === "Add department") {
        inquirer.prompt(addDepartment).then((depAnswer) => {
          let departmetName = depAnswer.depName;
       (() => {
            db.query(
                `INSERT INTO departments (dep_name) 
                values ("${departmetName}")`,
              (err, res) => {
                if (err) {
                  console.log(err);
                }
                console.log("\n");
                console.table(res);
                showData();
              }
            );
          })();

        });
      } else if (todo === "Update employee role") {
        db.query('select * from employe',(err,res)=>{
            if(err){console.log(err)}
            let myarr=[]
            res.forEach(element => {
                myarr.push(element.first_name)
            });
           
            inquirer.prompt([{
                type:"list",
                name:"first_name",
                message:"which employes role to update?",
                choices:myarr
            },]).then((dataName)=>{
              
              db.query('select * from roles',(err,resrol)=>{
                if(err){console.log(err)}
                let myarr2=[];
                resrol.forEach(element => {
                    myarr2.push(element.role_name)
                });
                inquirer.prompt([{
                    type:"list",
                    name:"role_name",
                    message:"to which new role the employe will be updated?",
                    choices:myarr2
                },]).then((datarole)=>{
                    dataName.role_name=datarole.role_name
                   db.query(`
                   UPDATE employe 
   SET role_name = "${dataName.role_name}"
    WHERE first_name = "${dataName.first_name}"
                   
                   
                   `,(err,res)=>{
                    if(err){console.log(err)}
                    console.log("\n");
                   
                    console.table(res);
                    showData();
                   })
                })

              })
              
            //     db.query(
            // `INSERT INTO roles (${Object.keys(data).join(",")}) 
            //  values (${Object.values(data).map((x)=>`"${x}"`).join(",")})`,
            //       (err, res) => {
            //         if (err) {
            //           console.log(err);
            //         }
            //         console.log("\n");
            //         console.table(res);
            //         showData();
            //       }
            //     )

            })

        })
      } else if (todo === "Delete employee") {
        console.log("Delete employee");
      } else if (todo === "Delete department") {
        console.log("Delete department");
      } else if (todo === "delete role") {
        console.log("delete role");
      } else {
        process.exit();
      }
    })
    .catch((err) => console.log(err));
  //console.log(result)
};
showData();

//
