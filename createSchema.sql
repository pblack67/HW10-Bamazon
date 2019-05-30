DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) 
VALUES 
('Nuclear Reactor', 'Nuclear Energy', '1000000', '1'),
('Uranium', 'Nuclear Energy', '250000', '10'),
('Comfy Socks', 'Clothing', '9.99', '15'),
('Comfy Pants', 'Clothing', '19.99', '20'),
('Comfy Shirt', 'Clothing', '15.99', '10'),
('Comfy Shoes', 'Clothing', '49.99', '5'),
('Hose', 'Household', '24.99', '8'),
('Rake', 'Household', '17.99', '3'),
('Lawn Mower', 'Household', '249.99', '4'),
('Snow Blower', 'Household', '274.99', '6')
;

SELECT * FROM products;