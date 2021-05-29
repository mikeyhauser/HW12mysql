const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'blackmag3',
  database: 'hrDB',
});


mainMenu();


//*****************************************************
//*****************************************************
//*****************************************************
async function mainMenu() {
  const { choice } = await inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?\n\n\n\n',
        name: 'choice',
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES"
          },
          {
            name: "Add Employees",
            value: "ADD_EMPLOYEES"
          },
          {
            name: "Add Departments",
            value: "ADD_DEPARTMENTS"
          },
          {
            name: "Add Roles",
            value: "ADD_ROLES"
          },
          {
            name: "Update employee roles",
            value: "UPDATE_ROLES"
          },
          {
            name: "View All Employees By Manager",
            value: "ALL_EMPLOYEES_BY_MAN"
          },
          {
            name: "View Employees Under One Manager",
            value: "EMPLOYEES_BY_ONE_MAN"
          },
        ]
      },

    ])
  //*****************************************************
  //*****************************************************
  //*****************************************************
  switch (choice) {
    case "VIEW_DEPARTMENTS":
      return viewDepartments()
    case "VIEW_ROLES":
      return viewRoles()
    case "VIEW_EMPLOYEES":
      return viewEmployees()
    case "ADD_DEPARTMENTS":
      return addDepartment()
    case "ADD_ROLES":
      return addRole()
    case "ADD_EMPLOYEES":
      return addEmployee()
    case "UPDATE_ROLES":
      return updateEmployeeRole()
    case "ALL_EMPLOYEES_BY_MAN":
      return viewAllEmployeesByManager()
    case "EMPLOYEES_BY_ONE_MAN":
      return viewEmployeesByOneManager()
    default:
      break;
  }
}
//*****************************************************
//*****************************************************
//*****************************************************
async function viewDepartments() {
  await connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res)
    connection.end
  })
  };
async function viewRoles() {
  await connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res)
    connection.end
  })
  };
function viewEmployees() {
  console.log("async viewEmployees")
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res)
    connection.end
  })
  };
//*****************************************************
//*****************************************************
//*****************************************************
async function addEmployee() {

  await inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter employee first name:',
        name: 'addFirstName',
      },
      {
        type: 'input',
        message: 'Enter employee last name:',
        name: 'addLastName',
      },
      {
        type: 'input',
        message: 'Enter role id of the employee:',
        name: 'addRoleId',
      }, {
        type: 'input',
        message: 'Enter manager id of the employee:',
        name: 'addManagerId',
      },
    ])

    .then((data) => {
      var addFirstName = JSON.stringify(data.addFirstName)
      var addLastName = JSON.stringify(data.addLastName)
      var addRoleId = data.addRoleId
      var addManagerId = data.addManagerId
      console.log(addFirstName, addLastName, addRoleId, addManagerId)
      console.log('Inserting a new employee...\n');
      const query = connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: addFirstName,
          last_name: addLastName,
          role_id: addRoleId,
          manager_id: addManagerId

        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} employee inserted!\n`);
          // Call updateProduct AFTER the INSERT completes
          viewEmployees();
        }
      );

    })
};
async function addDepartment() {

  await inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter department name:',
        name: 'addDepartmentName',
      }
    ])

    .then((data) => {
      var addDepartmentName = data.addDepartmentName

      console.log(addDepartmentName)
      console.log('Inserting a new department...\n');
      const query = connection.query(
        'INSERT INTO department SET ?',
        {
          department_name: addDepartmentName
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} department inserted!\n`);
          // Call updateProduct AFTER the INSERT completes
          viewDepartments();
        }
      );

    })
};
async function addRole() {

  await inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter Role Title:',
        name: 'addRoleName',
      },
      {
        type: 'input',
        message: 'Enter Role Salary:',
        name: 'addRoleSalary',
      },
      {
        type: 'input',
        message: 'Enter Department ID For This Role:',
        name: 'addDepartmentId',
      }
    ])

    .then((data) => {
      var addRoleName = data.addRoleName
      var addRoleSalary = data.addRoleSalary
      var addDepartmentId = data.addDepartmentId

      console.log(addRoleName)
      console.log('Inserting a new role...\n');
      const query = connection.query(
        'INSERT INTO role SET ?',
        {
          title: addRoleName,
          salary: addRoleSalary,
          department_id: addDepartmentId
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} role inserted!\n`);
          // view roles after completed
          viewRoles();
        }
      );

    })
};
//*****************************************************
//*****************************************************
//*****************************************************
async function updateEmployeeRole() {
  await inquirer
    .prompt([
      {
        type: 'input',
        message: 'Which Role Would You Like To Update? (Enter Role Id):',
        name: 'updateRoleId',
      },
      {
        type: 'input',
        message: 'Enter Updated Role Title:',
        name: 'updateRoleName',
      },
      {
        type: 'input',
        message: 'Enter Updated Role Salary:',
        name: 'updateRoleSalary',
      },
      {
        type: 'input',
        message: 'Enter Updated Department ID For This Role:',
        name: 'updateDepartmentId',
      }
    ])

    .then((data) => {
      var updateRoleId = data.updateRoleId
      var updateRoleName = data.updateRoleName
      var updateRoleSalary = data.updateRoleSalary
      var updateDepartmentId = data.updateDepartmentId



      console.log('Updating Employee Role...\n');
      const query = connection.query(
        `UPDATE hrDB.role SET
    title = '${updateRoleName}',
    salary = '${updateRoleSalary}' ,
    department_id = '${updateDepartmentId}' 
    WHERE (id = '${updateRoleId}');`,

        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} role updated!\n`);
          // view roles after completed
          viewRoles();
        }
      );

    })

};

//*****************************************************
//*****************************************************
//*****************************************************
async function viewAllEmployeesByManager(){
  await connection.query(`SELECT m.first_name  AS 'Manager First Name', m.last_name AS 'Manager Last Name', e.first_name AS 'Employee First Name', e.last_name AS 'Employee Last Name' FROM employee e INNER JOIN employee m WHERE m.id = e.manager_id ORDER BY m.id;
  `, (err, res) => {
    if (err) throw err;
    console.table(res)
    connection.end
  })

};

async function viewEmployeesByOneManager(){
  await connection.query(`SELECT m.id  AS 'Manager ID', m.first_name  AS 'Manager First Name', m.last_name AS 'Manager Last Name' FROM employee e INNER JOIN employee m WHERE m.id = e.manager_id ORDER BY m.id;`,
   (err, res) => {
    if (err) throw err;
    console.table(res)
    connection.end
  })
  await inquirer
    .prompt([
      {
        type: 'input',
        message: 'Which Manager Would You Like To View The Employees Of? (Enter Employee Id):',
        name: 'managerId',
      }
    ])
    .then((data) => {
      var managerId = data.managerId

       connection.query(`SELECT * FROM hrDB.employee WHERE manager_id = ${managerId};`,
       (err, res) => {
    if (err) throw err;
    console.table(res)
    connection.end
  })
      

    })

mainMenu();};
