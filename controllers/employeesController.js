const data = {
    employees:  require('../model/employees.json'),
    setEmployees: function ( data ) {
        this.employees = data
    }
};

const getEmployee = (req, res) => {
    const employee = data.employees.find(employee => employee.id === parseInt(req.params.id));
  
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.status(200).json(employee);
}

const getAllEmployees = (req, res) => {
    if(!data.employees) {
        return res.status(400).json({"message": "Error getting employees"})
    }
    res.status(200).json(data.employees);
}

const createNewEmployee = (req, res) => {
    
    const newEmployee = {
        id: data.employees[data.employees.length -1].id + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    
    if(!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required'})  
    } 
    
    const foundDuplicate = data.employees.find(employee => employee.firstname == (req.body.firstname));
    
    if (foundDuplicate && foundDuplicate.lastname == req.body.lastname) {
        return res.status(400).json( { "message": `Employee  ${req.body.lastname}, ${req.body.firstname} exists already`})
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);



}

module.exports =  {
    getAllEmployees,
    createNewEmployee,
    getEmployee
    // deleteEmployee,
}

// for getEmployee Function
  


// for createNewEmployee function - empty names
    // // uncomment this during presentation
    // if(!newEmployee.firstname || !newEmployee.lastname) {
    //     return res.status(400).json({ 'message': 'First and last names are required'})
    // } 

// for createNewEmployee Function - duplicate employee
   




// // Feature is not implemented yet
// const deleteEmployee = (req, res) => {
//     const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
//     if(!employee) {
//         return res.status(400).json ({ "message": `Employee Id ${req.body.id} not found` });
//     }

//     const filteredArray = data.employees.filter(emp => emp.id !==parseInt(req.body.id));

//     data.setEmployees([...filteredArray]);

//     res.json(data.employees );
// }

