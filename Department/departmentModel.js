const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    Manager: { type: String }
})

module.exports = mongoose.model('department', departmentSchema)