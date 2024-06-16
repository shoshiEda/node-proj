const express = require("express")
const router = express.Router()
const employeeService = require("./employeeService")

// http://localhost:8000/employee

router.get("/", async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees()

        return res.json(employees)
    }  catch (err) {
        res.status(500).send({ err: 'Failed to get employees' })
    }
})


router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const employee = await employeeService.getEmployeeById(id)
        return res.json(employee)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get employee' })
    }
})

router.get("/department/:depId", async (req, res) => {
    try{
    const depId = req.params.depId
    const employees = await employeeService.getEmployeeNotOfTheDepartment(depId)
    return res.json({ employees })
    }catch (err) {
        res.status(500).send({ err: 'Failed to get employees of department' })
    }
})

router.post("/", async (req, res) => {
    try{
    const {firstName,lastName} = req.body
    const {startWorkYear} = req.body || 0
    const {departmentID} = req.body || ''
    const employee = {firstName,lastName,startWorkYear,departmentID}
    const status = await employeeService.createEmployee(employee)
    return res.json({ status })
    }catch (err) {
        res.status(500).send({ err: 'Failed to add employee' })
    }
})

router.put("/:id", async (req, res) => {
    try{
    const id = req.params.id
    const {firstName,lastName} = req.body
    const {startWorkYear} = req.body || 0
    const {departmentID} = req.body || ''
    const employee = {firstName,lastName,startWorkYear,departmentID}
    const status = await employeeService.updateEmployee(id, employee)
    return res.json({ status })
    }catch (err) {
        res.status(500).send({ err: 'Failed to edit employee' })
    }
})

router.post("/department/:id", async (req, res) => {
    try{
    const id = req.params.id
    const {departmentID} = req.body 
    const status = await employeeService.addEmployeeToDepartment(id,departmentID)
    return res.json({ status })
    }catch (err) {
        res.status(500).send({ err: 'Failed to add employee to department' })
    }
})



router.delete("/:id", async (req, res) => {
    try{
    const id = req.params.id
    const status = await employeeService.deleteEmployee(id)
    return res.json({ status })
    }catch (err) {
        res.status(500).send({ err: 'Failed to delete employee' })
    }
})


module.exports = router