const express = require("express")
const router = express.Router()
const departmentService = require("./departmentService")
const log = require("../Logger/loggerSrevice")


// http://localhost:8000/department

router.get("/", async (req, res) => {
    try {
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const departments = await departmentService.getAllDepartments()
        log.info(`user:${fullname} - got all departments`)
        return res.json(departments)
    } catch (err) {
        log.error(`user:${fullname} - Failed to get demartments,${err}`)
        res.status(500).send({ err: 'Failed to get demartments' })
    }
})


router.get("/:id", async (req, res) => {
    try {
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const id = req.params.id
        const department = await departmentService.getDepartmentById(id)
        log.info(`user:${fullname} - got department:${id}`)
        return res.json(department)
    } catch (err) {
        log.error(`user:${fullname} - Failed to get demartment,${err}`)
        res.status(500).send({ err: 'Failed to get demartment' })
    }
})

router.post("/",processTokenMiddleware, async (req, res) => {
    try{
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const {name} = req.body
        const {Manager} = req.body || ''
        const department = {name,Manager}
        const status = await departmentService.createDepartment(department)
        log.info(`user:${fullname} - added department:${department}`)
        return res.json({ status })
    }catch (err) {
        log.error(`user:${fullname} - Failed to add demartment,${err}`)
        res.status(500).send({ err: 'Failed to add demartment' })
    }
})


router.put("/:id",processTokenMiddleware, async (req, res) => {
    try{
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const id = req.params.id
        const {name} = req.body
        const {Manager} = req.body || ''
        const department = {name,Manager}
        const status = await departmentService.updateDepartment(id, department)
        log.info(`user:${fullname} - edited department:${id}`)
        return res.json({ status })
    }catch (err) {
        log.error(`user:${fullname} - Failed to edit demartment,${err}`)
        res.status(500).send({ err: 'Failed to edit demartment' })
    }
})


router.delete("/:id",processTokenMiddleware, async (req, res) => {
    try{
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const id = req.params.id
        const status = await departmentService.deleteDepartment(id)
        log.info(`user:${fullname} - deleted department:${id}`)
        return res.json({ status })
    }catch (err) {
        log.error(`user:${fullname} - Failed to delete demartment,${err}`)
        res.status(500).send({ err: 'Failed to delete demartment' })
    }
})

module.exports = router