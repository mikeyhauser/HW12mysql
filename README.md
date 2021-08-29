# MySQL: Employee Tracker

View a demonstration of the functional database in action:
https://drive.google.com/file/d/1nW62Tu2S_RInYUMsfuBNPu_eCflagcg2/view

This Command Line Interface manages a database schema containing three tables:

* **department**:
  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:
  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:
  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee 

A User is able to do the following:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

  * Update employee managers

  * View employees by manager

This App uses the following dependencies:

  * inquirer: 6.2.1

  * dotenv: 8.2.0

  * express: 4.17.1

  * mysql: 2.16.0

  * sequelize: 6.3.5

  * console.table: 0.10.0

