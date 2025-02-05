const express = require("express")
const cors = require('cors')
const morgan = require('morgan')
const handleError = require('./middlewares/error')


//Routing
const authRouter = require("./routes/auth-route")
const app =express()


//middlewares
app.use(cors()); // Allow cross Domain
app.use(morgan("dev")) //show log in Terminal
app.use(express.json()) // Read JSON

//Routing
app.use("/api", authRouter)

//HandleError
app.use(handleError)

const PORT = 8000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))