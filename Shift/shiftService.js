const Shift = require("./shiftModel")




const getAllShifts = async () => {
    const shifts = await Shift.find({})
    return shifts
}

const getShiftById = async (id) => { 
    const shift = await Shift.findById(id)
    return shift
}

const getShiftsByEmpId = async (empId) => { 
    const shifts = await Shift.find({employees:empId})
    return shifts
}

const createShift = async (shift) => { 

    const newShift = new Shift(shift) 
    await newShift.save()
    return "Created"

}

const addEmployeeToShift = async (id, empId) =>{
    await Shift.updateOne({ _id: id },{ $push: { employees: empId } })
    return 'Employee added'
}

module.exports = {getAllShifts,getShiftById,getShiftsByEmpId,createShift,addEmployeeToShift}