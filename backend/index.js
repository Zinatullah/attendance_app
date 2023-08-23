const express = require('express')
const Color = require('color');
const bodyParser = require('body-parser')
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors')
const app = express()

PORT = 5000

app.use(cors())
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with the actual origin of your React app
// }));
app.use(express.json())
app.use(express.urlencoded({ extended: "true" }))

app.use('/api/users', require("./routes/userRoutes"))
app.use('/api/leaves', require("./routes/leavesRoutes"))
app.use('/api/reports', require("./routes/reportsRoutes"))
// app.use('/api/userattendance', require("./routes/userAttendanceRoutes"))
app.use('/api/userattendances', require("./routes/attendanceRoutes"))
app.use('/api/devices', require("./routes/devicesRoutes"))
app.use('/api/employees', require("./routes/employeesRoutes"))
app.use('/api/logs', require("./routes/logsRoutes"))
// app.use('/api/goals', require("./routes/goalRoutes"))

app.use(bodyParser.urlencoded({extended: true}))

app.use(errorHandler);

app.listen(PORT, ()=>{
  console.log('Server is running on PORT: ', PORT)
})