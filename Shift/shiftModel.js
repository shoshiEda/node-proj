const mongoose = require('mongoose')

const shiftSchema = new mongoose.Schema({
    shiftDate: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    employees:[String]
})

module.exports = mongoose.model('shift', shiftSchema)

