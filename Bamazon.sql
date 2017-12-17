CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price FLOAT(8) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    cost FLOAT(8),
    PRIMARY KEY(item_id)
);