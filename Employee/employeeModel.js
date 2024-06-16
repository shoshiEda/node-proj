const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    startWorkYear: { type: Number},
    departmentID: { type: String },
    shifts:[String]

})

module.exports = mongoose.model('employee', employeeSchema)