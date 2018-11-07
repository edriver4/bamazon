DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(25) NOT NULL,
price DECIMAL(4,2) NULL,
stock_quantity INT(3),
PRIMARY KEY (item_id)
);

