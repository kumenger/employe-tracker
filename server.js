 const inquirer = require("inquirer");

   
    const questions = [{
        type: 'list',
        name: 'task',
        message: 'What would you like to do?',
        choices: [
         new inquirer.Separator(),
            'View all employees',
            'View employees by manager',
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
           
        ],
        pageSize: 28
       
    }];
  
  
  
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
        // else{
        //     process.exit()
        // }
        
    }).catch((err)=>console.log(err))
    //console.log(result)
  }
  showData()