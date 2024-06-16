const express = require("express")
const router = express.Router()
const shiftService = require("./shiftService")

// http://localhost:8000/shift

router.get("/", async (req, res) => {
    try {
        const shifts = await shiftService.getAllShifts()

        return res.json(shifts)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get shifts' })
    }
})


router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const shift = await shiftService.getShiftById(id)
        return res.json(shift)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get shift' })
    }
})

router.get("/emp/:id", async (req, res) => {
    try {
        const id = req.params.id
        const shifts = await shiftService.getShiftsByEmpId(id)
        return res.json(shifts)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get shift by employee' })
    }
})

router.post("/", async (req, res) => {
    try{
    const {shiftDate,startTime,endTime} = req.body
    const shift = {shiftDate,startTime,endTime}
    const status = await shiftService.createShift(shift)
    return res.json({ status })
    } catch (err) {
        res.status(500).send({ err: 'Failed to add shift' })
    }
})

router.post("/:id", async (req, res) => {
    try{
    const id = req.params.id
    const {empId} = req.body
    const status = await shiftService.addEmployeeToShift(id,empId)
    return res.json({ status })
} catch (err) {
    res.status(500).send({ err: 'Failed to add employee to shift' })
}
})



module.exports = router