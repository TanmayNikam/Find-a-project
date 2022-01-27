const express = require("express")
const router = express.Router()
const {getTags,addTag} = require("../controllers/tag")

router.route("/tags")
    .get( getTags)
    .post(addTag) 

module.exports = router