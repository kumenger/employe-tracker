const inquirer = require("inquirer");
const questions=require('./questions')
const showData= async ()=>{
    await inquirer.prompt(questions).then((answer)=>{
         const todo=answer.task
         if(todo==='View all employees'){
             console.log('show employe')
         }
         else if(todo==='View employees by manager'){
             console.log('show all employe by manger')
         }
         else if(todo==='View all roles'){
             console.log('View all roles')
         }
         else if(todo==='View all departments'){
             console.log('View all departments')
         }
         else if(todo==='Add employee'){
             console.log('Add employee')
         }
         else if(todo==='Add role'){
             console.log('Add role')
         }
         else if(todo==='Add department'){
             console.log('Add department')
         }
         else if(todo==='Update employee'){
             console.log('Update employee')
         }
         else if(todo==='Delete employee'){
             console.log('Delete employee')
         }
         else if(todo==='Delete department'){
             console.log('Delete department')
         }
         else if(todo==='delete role'){
             console.log('delete role')
         }
         else{
             process.exit()
         }
         
     }).catch((err)=>console.log(err))
     //console.log(result)
   }
   module.exports=showData()