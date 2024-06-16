const express = require("express")
const router = express.Router()
const departmentService = require("./departmentService")

// http://localhost:8000/department

router.get("/", async (req, res) => {
    try {
        const departments = await departmentService.getAllDepartments()

        return res.json(departments)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get demartments' })
    }
})


router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const department = await departmentService.getDepartmentById(id)
        return res.json(department)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get demartment' })
    }
})

router.post("/", async (req, res) => {
    try{
    const {name} = req.body
    const {Manager} = req.body || ''
    const department = {name,Manager}
    const status = await departmentService.createDepartment(department)
    return res.json({ status })
    }catch (err) {
        res.status(500).send({ err: 'Failed to add demartment' })
    }
})


router.put("/:id", async (req, res) => {
    try{
    const id = req.params.id
    const {name} = req.body
    const {Manager} = req.body || ''
    const department = {name,Manager}
    const status = await departmentService.updateDepartment(id, department)
    return res.json({ status })
    }catch (err) {
        res.status(500).send({ err: 'Failed to edit demartment' })
    }
})


router.delete("/:id", async (req, res) => {
    try{
    const id = req.params.id
    const status = await departmentService.deleteDepartment(id)
    return res.json({ status })
    }catch (err) {
        res.status(500).send({ err: 'Failed to delete demartment' })
    }
})

module.exports = router