require("dotenv").config()
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const express = require("express")
const app = express()


app.use(helmet())
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())


// const authRouter = require("routes/auth")
const userRouter = require("./routes/user")
const postRouter = require("./routes/post")
const tagRouter = require("./routes/tag")

// app.use("/api",authRouter)
app.use("/api", userRouter)
app.use("/api",postRouter)
app.use("/api",tagRouter)

module.exports = app;