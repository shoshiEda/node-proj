const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    fullname: {required: true, type: String},
    numOfActions: Number,
    lastLogin: { type: Date }
  
})

module.exports = mongoose.model("user", userSchema)