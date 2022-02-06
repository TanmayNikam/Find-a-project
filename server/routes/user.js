
const express = require("express")
const router = express.Router()

const userController = require("../controllers/user")
const authController = require("../controllers/auth")


router.route("/:id/follow")
    .get(userController.follow)

router.route("/feed")
    .get(authController.isLoggedIn, userController.feed)



module.exports = router