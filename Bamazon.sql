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


INSERT INTO departments(department_name, over_head_costs, product_sales, total_profit)
VALUES ("Headphones", 20000, 43560, 10000),
("Earphone", 13000, 76000, 21200),
("Accessories", 8500, 0, -8500);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Audio Technica ATH-AD700X", "Headphones", 199.95 ,50),
("Audio Technica ATH-AD900X", "Headphones", 148.00 ,20),
("Audio Technica Audiophile ATH-AD1000X", "Headphones", 599.95 ,40),
("Sennheiser HD 650 ", "Headphones", 499.95 ,24),
("Sennheiser RS 185 RF Wireless Headphone", "Headphones", 299.95 ,73),
("Sennheiser HD 660 S - HiRes", "Headphones", 499.95 ,66),
("AKG Pro Audio K812PRO", "Headphones", 1499.00 ,58),
("Sony Extra Bass Wired Headphones", "Earphone", 59.99 ,15),
("Sony XBA-300AP Hi-Res", "Earphone", 259.00 ,76),
("Sennheiser HD1", "Earphone", 199.95 ,35),
("Sennheiser IE 80 S ", "Earphone", 349.95 ,88),
("JVC Memory Foam Earbud", "Earphone", 13.41 ,97),
("JVC Extreme Deep Bass", "Earphone", 19.99 ,52),
("Panasonic RP-HJE120-PPK", "Earphone", 15.00 ,12),
("bluetooth headphones accessory stereo cable BT004", "Accessories", 7.99 ,37),
("Genuine Replacement Ear Pads", "Accessories", 13.99 ,91),
("Wooden Omega Headphones Stand", "Accessories", 32.51 ,56),
