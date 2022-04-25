
const app = require('../../server')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

async function getEmployees () {
    return await chai
      .request(app)
      .get('/employees/all')
      .set('Accept', 'application/json')
      .send({
      // Payload
        })
    }
  
async function getAnEmployee (employeeId) {
    return await chai
        .request(app)
        .get('/employees/'+ employeeId)
        .set('Accept', 'application/json')
        .send({
        // Payload
        
        })
    }
      
async function addNewEmployee (employeeData) {
    return await chai
        .request(app)
        .post('/employees/new')
        .set('Accept', 'application/json')
        .send(employeeData)
    }
          
    



module.exports = {
    getEmployees,
    getAnEmployee,
    addNewEmployee

}