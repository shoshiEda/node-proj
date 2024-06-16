const express = require("express")
const router = express.Router()
const shiftService = require("./shiftService")
const log = require("../Logger/loggerSrevice")


// http://localhost:8000/shift

router.get("/", async (req, res) => {
    try {
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const shifts = await shiftService.getAllShifts()
        log.info(`user:${fullname} - got all shifts`)
        return res.json(shifts)
    } catch (err) {
        log.error(`user:${fullname} - Failed to get shifts,${err}`)
        res.status(500).send({ err: 'Failed to get shifts' })
    }
})


router.get("/:id", async (req, res) => {
    try {
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const id = req.params.id
        const shift = await shiftService.getShiftById(id)
        log.info(`user:${fullname} - got shift:${id}`)
        return res.json(shift)
    } catch (err) {
        log.error(`user:${fullname} - Failed to get shift,${err}`)
        res.status(500).send({ err: 'Failed to get shift' })
    }
})

router.get("/emp/:id", async (req, res) => {
    try {
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const id = req.params.id
        const shifts = await shiftService.getShiftsByEmpId(id)
        log.info(`user:${fullname} - got shifts by employee:${id}`)
        return res.json(shifts)
    } catch (err) {
        log.error(`user:${fullname} - Failed to get shifts by employee,${err}`)
        res.status(500).send({ err: 'Failed to get shift by employee' })
    }
})

router.post("/",processTokenMiddleware, async (req, res) => {
    try{
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const {shiftDate,startTime,endTime} = req.body
        const shift = {shiftDate,startTime,endTime}
        const status = await shiftService.createShift(shift)
        log.info(`user:${fullname} - added shift:${shift}`)
        return res.json({ status })
    } catch (err) {
        log.error(`user:${fullname} - Failed to add shift,${err}`)
        res.status(500).send({ err: 'Failed to add shift' })
    }
})

router.post("/:id",processTokenMiddleware, async (req, res) => {
    try{
        const { loggedinUser } = req
        const { fullname} = loggedinUser
        const id = req.params.id
        const {empId} = req.body
        const status = await shiftService.addEmployeeToShift(id,empId)
        log.info(`user:${fullname} - deleted shift:${id}`)
        return res.json({ status })
} catch (err) {
    log.error(`user:${fullname} - Failed to delete shift,${err}`)
    res.status(500).send({ err: 'Failed to add employee to shift' })
}
})



module.exports = router