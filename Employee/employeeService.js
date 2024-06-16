const Employee = require("./employeeModel")
const Department = require("../Department/departmentModel")
const Shift = require("../Shift/shiftModel")




const getAllEmployees = async () => {
    const employees = await Employee.find({})
    return employees
}

const getEmployeeById = async (id) => { 
    const employee = await Employee.findById(id)
    return employee

}

const createEmployee = async (employee) => { 

    const newEmployee = new Employee(employee) 
    await newEmployee.save()
    return "Created"

}

const updateEmployee = async (id, newData) => { 

    await Employee.findByIdAndUpdate(id, newData)
    return "Updated"
}

const deleteEmployee = async (id) => {

    await Employee.findByIdAndDelete(id)
    await Department.updateMany({Manager:id}, { $unset: { Manager: "" } });
    await Shift.updateMany({},{ $pull: { employees: id } })
    return "Deleted"
}

const addEmployeeToDepartment = async (id, departmentId) =>{
    await Employee.updateOne({ _id: id },{$set:{ departmentID: departmentId }})
    return 'Employee added'
}

const getEmployeeNotOfTheDepartment = async (depId) => {
    const employees = await Employee.find({departmentID: { $ne: depId } })
    return employees
}

module.exports = {getAllEmployees,getEmployeeById,createEmployee,updateEmployee,deleteEmployee,addEmployeeToDepartment,getEmployeeNotOfTheDepartment}