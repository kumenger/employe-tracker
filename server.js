const inquirer = require("inquirer");
const { questions, addDepartment } = require("./helpers/questions");
const cTable = require("console.table");
const mysql = require("mysql2");
require("dotenv").config();
const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');
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
                    console.log(red(`${data.first_name} employe is added to database `));
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
                    console.table(red(`${data.role_name} role is added to database `));
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
                console.table(red(`${departmetName} department is added to database `));
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
                   
                    console.table(red(`${dataName.first_name}'s role is changed to ${dataName.role_name}`));
                    showData();
                   })
                })

              })
              
      

            })

        })
      } else if (todo === "Update employe manager") {
       db.query(`select * from employe `,(err,res)=>{
        if(err){return err}
       
        let myfirstNameholder=[];
        res.forEach((elem)=>{
        
          myfirstNameholder.push(elem.first_name)
        })
       inquirer.prompt([{
        type:"list",
        name: "first_name",
        message:'which employe to change manager',
        choices:myfirstNameholder
       },{
        type:'input',
        name: 'manager_name',
        message:'what will be the new manager name',
       }]).then((data)=>{
       db.query(`UPDATE employe 
       SET manager_name = "${data.manager_name}"
        WHERE first_name = "${data.first_name}" `,(err,res)=>{
                        if(err){console.log(err)}
                        console.log("\n");
                     console.table(red(` ${data.first_name}'s manager successfully changed to ${data.manager_name}`));
                        showData();

       })
       }
       )
      
       })
      }  else if (todo === "Delete role") {
         db.query('SELECT sum(b.salary) FROM departments a INNER JOIN roles b ON b.dep_name = a.dep_id WHERE a.dep_name="Cyber Security"',(err,res)=>{
       if(err){return console.log(err)}
          console.log(res)
          //ON b.dep_name = a.dep_id
      })
      } else if (todo === "View total utilized budget by department") {
        db.query("select * from employe INNER JOIN roles ON roles.role_name=employe.role_name;" ,(err,resMain)=>{
          if(err){return err}
          let departmentname=[]
          resMain.forEach((elem)=>{
            departmentname.push(elem.dep_name)
          })
         // console.log(res)
        inquirer.prompt([{
         type:"list",
         name:"dep_name",
         choices:departmentname,
         message:"Select which department's consumed budget to look for ?"
        }]).then((dataHere)=>
           {
          
        
            
       db.query(`select  sum(roles.salary) as total from employe INNER JOIN roles ON roles.role_name=employe.role_name where roles.dep_name='${dataHere.dep_name}' `,(err,res)=>{
             if(err){return console.log(err)}
             console.log(res[0].total)
             console.log(red(`the total budget consumed by ${dataHere.dep_name} is ${res[0].total}` ))
             showData()
            })
          }
        )
        })
      } else {
        process.exit();
      }
    })
    .catch((err) => console.log(err));
  //console.log(result)
};
showData();

//
