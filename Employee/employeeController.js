const express = require("express")
const router = express.Router()
const employeeService = require("./employeeService")
const log = require("../Logger/loggerSrevice")

// http://localhost:8000/employee

router.get("/", async (req, res) => {
    try {
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const employees = await employeeService.getAllEmployees()
        log.info(`user:${fullname} - got all employees`)
        return res.json(employees)
    }  catch (err) {
        log.error(`user:${fullname} - Failed to get employees,${err}`)
        res.status(500).send({ err: 'Failed to get employees' })
    }
})


router.get("/:id", async (req, res) => {
    try {
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const id = req.params.id
        const employee = await employeeService.getEmployeeById(id)
        log.info(`user:${fullname} - got employee with id:${id}`)
        return res.json(employee)
    } catch (err) {
        log.error(`user:${fullname} - Failed to get employee,${err}`)
        res.status(500).send({ err: 'Failed to get employee' })
    }
})

router.get("/department/:depId", async (req, res) => {
    try{
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const depId = req.params.depId
        const employees = await employeeService.getEmployeeNotOfTheDepartment(depId)
        log.info(`user:${fullname} - got all employees that are not at department:${depId}`)
        return res.json({ employees })
    }catch (err) {
        log.error(`user:${fullname} - Failed to get employees that are not in the department,${err}`)
        res.status(500).send({ err: 'Failed to get employees of department' })
    }
})

router.post("/",processTokenMiddleware, async (req, res) => {
    try{
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const {firstName,lastName} = req.body
        const {startWorkYear} = req.body || 0
        const {departmentID} = req.body || ''
        const employee = {firstName,lastName,startWorkYear,departmentID}
        const status = await employeeService.createEmployee(employee)
        log.info(`user:${fullname} - added the employee:${employee}`)
        return res.json({ status })
    }catch (err) {
        log.error(`user:${fullname} - Failed to add employee,${err}`)
        res.status(500).send({ err: 'Failed to add employee' })
    }
})

router.put("/:id",processTokenMiddleware, async (req, res) => {
    try{
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const id = req.params.id
        const {firstName,lastName} = req.body
        const {startWorkYear} = req.body || 0
        const {departmentID} = req.body || ''
        const employee = {firstName,lastName,startWorkYear,departmentID}
        const status = await employeeService.updateEmployee(id, employee)
        log.info(`user:${fullname} - edited the employee:${id}`)
        return res.json({ status })
    }catch (err) {
        log.error(`user:${fullname} - Failed to edit employee,${err}`)
        res.status(500).send({ err: 'Failed to edit employee' })
    }
})

router.post("/department/:id",processTokenMiddleware, async (req, res) => {
    try{
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const id = req.params.id
        const {departmentID} = req.body 
        const status = await employeeService.addEmployeeToDepartment(id,departmentID)
        log.info(`user:${fullname} - added employee:${id} to department:${departmentID}`)
        return res.json({ status })
    }catch (err) {
        log.error(`user:${fullname} - Failed to add employee to department,${err}`)
        res.status(500).send({ err: 'Failed to add employee to department' })
    }
})



router.delete("/:id",processTokenMiddleware, async (req, res) => {
    try{
    const id = req.params.id
    const status = await employeeService.deleteEmployee(id)
    log.info(`user:${fullname} - deleted employee:${id}`)
    return res.json({ status })
    }catch (err) {
        log.error(`user:${fullname} - Failed to delete employee,${err}`)
        res.status(500).send({ err: 'Failed to delete employee' })
    }
})


module.exports = router