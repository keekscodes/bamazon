DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NULL,
department_name VARCHAR(30) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INTEGER NULL,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lustered Stemless Wine Glasses", "Home", 34, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Daliah Faux Fur Throw Blanket", "Home", 128, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Winnie Tie-Dyed Tank Top", "Tops", 58, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Catalina Mini Dress", "Dresses", 268, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Don't @ Me White Frame Sunglasses", "Accessories", 65, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Woven Straw Poolside Tote", "Accessories", 215, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("White Selenite Bookends", "Home", 68, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sea Salt Texture Spray", "Beauty", 16, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jade Mini Face Roller", "Beauty", 38, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chrissy Knotted Headband", "Accessories", 18, 10);





