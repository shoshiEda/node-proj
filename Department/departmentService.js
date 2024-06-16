const Department = require("./departmentModel")
const Employee = require("../Employee/employeeModel")



const getAllDepartments = async () => {
    const departments = await Department.find({})
    return departments
}

const getDepartmentById = async (id) => { 
    const department = await Department.findById(id)
    return department

}

const createDepartment = async (department) => { 

    const newDepartment = new Department(department) 
    await newDepartment.save()
    return "Created"

}



const updateDepartment = async (id, newData) => { 

    await Department.findByIdAndUpdate(id, newData)
    return "Updated"
}

const deleteDepartment = async (id) => {

    await Department.findByIdAndDelete(id)
    await Employee.updateMany({departmentID:id}, { $unset: { departmentID: "" } });
    return "Deleted"
}


module.exports = {getAllDepartments,getDepartmentById,createDepartment,updateDepartment,deleteDepartment}