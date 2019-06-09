//Dependencies
// const express = require ('express');
const mysql = require('mysql');
const inquirer = require('inquirer');
// const path = require ('path');

//Create an instance of the express app.
// const app = express();

//Set port
// const PORT = process.env.PORT || 3000;

//Mysql  DB connection info
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Acc@t04012008",
    database: "bamazonDB_db"
});

connection.connect((err) => {
    if (err) throw err;
    start();
});

const start = () => {
    inquirer
        .prompt({
            name: "welcome",
            type: "confirm",
            message: "Welcome to BAMAZON. Would you like to see sales Item?"
        })
        .then((answer) => {
            let query = "SELECT * FROM products";
            connection.query(query, (err, res) => {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    console.log(hi);
                    // console.log(`Product Name: ${res[i].product_name} | Department: ${res[i].department_name} | Price: $${res.[i].price} | Quantity left: ${res.[i].stock_quantity}`)
                }
            })
        });
}