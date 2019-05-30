DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL(10,2) NOT NULL, 
  PRIMARY KEY (item_id)
);

INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`) 
VALUES 
('Nuclear Reactor', 'Nuclear Energy', '1000000', '1', '0'),
('Uranium', 'Nuclear Energy', '250000', '10', '0'),
('Comfy Socks', 'Clothing', '9.99', '15', '0'),
('Comfy Pants', 'Clothing', '19.99', '20', '0'),
('Comfy Shirt', 'Clothing', '15.99', '10', '0'),
('Comfy Shoes', 'Clothing', '49.99', '5', '0'),
('Hose', 'Household', '24.99', '8', '0'),
('Rake', 'Household', '17.99', '3', '0'),
('Lawn Mower', 'Household', '249.99', '4', '0'),
('Snow Blower', 'Household', '274.99', '6', '0')
;

SELECT * FROM products;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs INT NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES
('Clothing', '100'),
('Household', '50'),
('Nuclear Energy', '100000');

SELECT * from departments; 