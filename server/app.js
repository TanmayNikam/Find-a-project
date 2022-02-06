require("dotenv").config()
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const express = require("express")
const passport = require("passport")
const cookieSession = require('cookie-session')
const { Strategy } = require("passport-google-oauth20")

const { authOptions } = require("./config/config")
const authController = require("./controllers/auth")
const { sessionOptions } = require('./config/config')





passport.use('google', new Strategy(authOptions, authController.verifyCallback));
passport.serializeUser(authController.serializeUser);
passport.deserializeUser(authController.deserializeUser);



const app = express()

app.use(helmet())
app.use(cookieSession(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(morgan("dev"))
app.use(cors())



const userRouter = require("./routes/user")
const postRouter = require("./routes/post")
const tagRouter = require("./routes/tag")
const authRouter = require("./routes/auth")


app.use("/",authRouter)
app.use("/api", userRouter)
app.use("/api",postRouter)
app.use("/api",tagRouter)



module.exports = app;