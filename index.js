const express = require('express')
const app = express();
const port = 8000;
const cors = require("cors")

const authenticateToken = require('./middlewere/requireAuth')



 require("./configs/database")

app.use(express.json())
app.use(cors())


const userController = require("./User/userController.js")
app.use("/auth", userController)

app.use(authenticateToken.requireAuth)

const employeeController = require("./Employee/employeeController.js")
app.use("/employee", employeeController)

const departmentController = require("./Department/departmentController.js")
app.use("/department", departmentController)

const shiftController = require("./Shift/shiftController.js")
app.use("/shift", shiftController)




app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});