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

CREATE TABLE departments(
	department_id INTEGER AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs FLOAT(8) NOT NULL,
	product_sales FLOAT(8) DEFAULT 0,
	product_cost FLOAT(8) DEFAULT 0,
	total_profit FLOAT(8) DEFAULT 0,
	PRIMARY KEY(department_id)
);
