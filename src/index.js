const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 3000

// CORS Policy
app.use(cors())
app.options('*', cors())


// Express converts response to JSON
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


// Without middleware: new request --> run route handler
// With middleware: new request --> do something --> run route handler
// tokens consist of:
//header.payload(body).signature

app.listen(port, () => {
    console.log("Server is up on " + port)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, "thisismynodeproject", {expiresIn: "4 seconds"})
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynodeproject')
//     console.log(data)
// }

// myFunction()