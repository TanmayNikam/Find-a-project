
const express = require("express")
const router = express.Router()
const passport = require("passport")

const config = require('../config/config')
const authController = require("../controllers/auth")
const userController = require("../controllers/user")


router.route("/auth/google")
    .get(passport.authenticate('google',config.scopes));

router.route("/auth/google/callback")
    .get(passport.authenticate('google', config.callbackOptions))


router.route("auth/logout")
    .get(authController.logout)


router.route("/feed")
    .get(authController.isLoggedIn, (req, res) => {
        res.status(200).json({
            message: "feed"
        })
    })



module.exports = router