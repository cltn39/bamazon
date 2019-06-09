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
    console.log(`connected as id ${connection.threadId}\n`);
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
            if (answer.welcome === true) {
                let query = "SELECT * FROM products";
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    for (let i = 0; i < res.length; i++) {
                        console.log(`Product ID: ${res[i].id} | Product Name: ${res[i].product_name} | Department: ${res[i].department_name} | Price: $${res[i].price} | Quantity left: ${res[i].stock_quantity}`)
                    }
                })
                searchById();
            } else {
                connection.end();
            }
        });
}

const searchById = () => {
    connection.query(
        "SELECT * FROM products", (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([{
                    name: "searchById",
                    type: "input",
                    message: "Enter the ID of the product that you would like to purchase.",
                    validate: (value) => {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }])
                .then((answer) => {
                    let chosenID;
                    for (let i = 0; i < res.length; i++) {
                        // console.log(answer.searchById);
                        // console.log(res[i].id);
                        if (res[i].id === parseInt(answer.searchById)) {
                            chosenID = res[i];
                            console.log("ID " + chosenID.id + " has been selected. bringing product data...");
                            console.log(`Product ID: ${res[i].id} | Product Name: ${res[i].product_name} | Department: ${res[i].department_name} | Price: $${res[i].price} | Quantity left: ${res[i].stock_quantity}`)
                            if (chosenID.stock_quantity > 0) {
                                inquirer
                                    .prompt([{
                                        name: "quantity",
                                        type: "input",
                                        message: "How many would you like to purchase?",
                                        validate: (value) => {
                                            if (isNaN(value) === false) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }])
                                    .then((answer) => {    
                                        connection.query(
                                            "UPDATE products SET ? WHERE ?", 
                                            [
                                                {stock_quantity: chosenID.stock_quantity - answer.quantity},
                                                {id: chosenID.id}
                                            ], (error) => {
                                                if (error) throw err;
                                                console.log(`Placed the order with quanitiy of ${answer.quantity}`);
                                                start();
                                            }
                                        )
                                    })
                            }
                        }
                    }
                })

        }
    )
}