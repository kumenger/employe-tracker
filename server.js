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
        console.log("Add employee");
      } else if (todo === "Add role") {
        db.query('select * from departments',(err,res)=>{
            if(err){console.log(err)}
            let myarr=[]
            res.forEach(element => {
                myarr.push(element.dep_name)
            });
            console.log(myarr)
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
      } else if (todo === "Update employee") {
        console.log("Update employee");
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
