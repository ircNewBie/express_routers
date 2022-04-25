const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');

router.route('/all')
    .get(employeesController.getAllEmployees);

router.route('/new')
    .post(employeesController.createNewEmployee);


router.route('/:id')
    .get(employeesController.getEmployee);


module.exports = router;