var assert = require('assert');

const { 
    getEmployees, 
    getAnEmployee,
    addNewEmployee 
} = require('../helpers/employees.helper');


describe('Employees Functionalities ', function () {
    describe('Test endpoint: GET /employees/all  ', function() {
        it('Should retrieve all employees ',  async () => {
            const res = await getEmployees();
            assert.equal(res.status, 200, " Success ")
            // console.log(res.body)
        })

    });

    describe('Test endpoint: POST /employees/new ', function() {
        it('Should add new employee to the database', async ()=> {
            let employeeData = {
                "firstname": "Bong",
                "lastname": "Bungalan"
            }
            const res = await addNewEmployee(employeeData);
            assert(res.status, 200)
            // console.log(res.body)
        })

        it("Should not proceed if firstname or lastname is null or empty.", async()=> {
            let employeeData = {
                "firstname": "",
                "lastname": ""
            }

            const res = await addNewEmployee(employeeData);
            assert.equal(res.status, 400, "Should be a bad request - the response status should be 400")
            assert.equal(res.body.message, 'First and last names are required', 'the response body message should be: First and last names are required')
        })

        it('Should not allow duplicate employee. ', async () => {
            let duplicateEmployeeData = {
                "firstname": "John",
                "lastname": "Cruz"
            }

            const res = await addNewEmployee(duplicateEmployeeData);
            // console.log(res.body)
            assert.equal(res.status, 400, "Should be a bad request - 400")
            assert.equal(res.body.message, `Employee  ${duplicateEmployeeData.lastname}, ${duplicateEmployeeData.firstname} exists already` )
        })

        
    });

    describe('Test endpoint:  GET /employees/:id ', function() {
        it('Should get an employees data given an employeeId', async ()=> {
            let employeeId = 2;
            const res = await getAnEmployee(employeeId);
            // console.log(res.body)
            assert(res.status == 200, "It should return an employee")
        })

        it('Should throw an error if employee is not found', async() => {
            let notFoundEmployeeId = 100;

            const res = await getAnEmployee(notFoundEmployeeId);
            assert.equal(res.status, 400, `Employee ID ${notFoundEmployeeId} not found`)
            assert.equal(res.body.message, `Employee ID ${notFoundEmployeeId} not found` )
        })
        
    })
})
 


