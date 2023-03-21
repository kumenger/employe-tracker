
//const showData =require('./helpers/showData')  
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config()
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host:'localhost',
    // MySQL Username
    user:process.env.DB_USER,
    // TODO: Add MySQL Password
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
  },
  console.log(`Connected to the books_db database.`)
);
//showData


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

   
  
  
  

 // 