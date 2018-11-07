DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(60) NOT NULL,
department_name VARCHAR(25) NOT NULL,
price DECIMAL(4,2) NULL,
stock_quantity INT(3),
PRIMARY KEY (item_id)
);

INSERT INTO products
( -- CREATE COLUMNS FOR THE TABLE
product_name, department_name, price, stock_quantity
)
VALUES
(
    'Dragon Ball Z: Season 1', 'Entertainment', 30.95, 80
),
(
    'The Last Kingdom', 'Books', 20.99, 30
),
(
    '13-inch MacBook Pro', 'Electronics', 2700.00, 15
),
(
    'Dragon Ball Z: Seasons 1-8', 'Entertainment', 120.99, 40
),
(
    'The Lord of the Rings Trilogy: Extended Edition', 'Entertainment', 99.99, 10
),
(
    'Xbox One', 'Electronics', 349.00, 25
),
(
    'Leather Chair', 'Furniture', 400.00, 10
),
(
    'Printing Paper', 'Office Supplies', 20.00, 100
),
(
    'PS4', 'Electronics', 349.00, 20
),
(
    'Computer Case', 'Office Supplies', 50.00, 83
);