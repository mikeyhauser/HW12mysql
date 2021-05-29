
DROP DATABASE IF EXISTS hrDB;

CREATE DATABASE hrDB;

USE hrDB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(30),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(30),
PRIMARY KEY (id)
);


-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100);

-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("chocolate", 3.10, 120);

-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("strawberry", 3.25, 75);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);

SELECT m.first_name  AS 'Manager fn', m.last_name AS 'Manager ln',
	e.first_name AS 'Employee'

  -- select tells us what columns to show in our results.
  -- the m. and e. refer to the syn tables we are creating in the FROM employee e // INNER JOIN employee m
FROM employee e INNER JOIN employee m WHERE m.id = e.manager_id
ORDER BY m.id;
