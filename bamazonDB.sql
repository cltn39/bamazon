DROP DATABASE IF EXISTS bamazonDB_db;

CREATE DATABASE bamazonDB_db;

USE bamazonDB_db;

CREATE TABLE products (
    id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(30,2),
    stock_quantity INTEGER(30),
    PRIMARY KEY (id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity) 
VALUES 
("Lenovo Ideapad", "Electronic", 330, 18), 
("EXpress Men's Dress Shirts", "Clothing", 16.90, 17),
("20-Ounce Ocean Spray Craisins", "Grocery", 4.10, 25),
("Korg B1 88-Key Digial Piano", "Electronic", 300, 20),
("184-Count Hefty Clider Storage Bags", "Grocery", 11.20, 55),
("LEGO Technic Chevrolet Corvette ZR1", "Toys", 40, 25),
("Gildan Color Short Sleeve T-Shirt", "Clothing", 2, 76),
("1TB Microsoft Xbox One X console", "Electronic", 400, 60),
("Levi's Sherpa-Lined Hood", "Clothing", 8.40, 33),
("2-Litter A&W Root Beer", "Grocery", 1.90, 156);

SELECT * FROM products;
