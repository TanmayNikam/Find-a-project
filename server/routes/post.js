const express = require("express")
const router = express.Router()
const { getPost, addPost, getAllPosts }  = require("../controllers/post")


router.route("/post")
    .post(addPost)
    .get(getAllPosts)
router.route("/post/:id")
    .get(getPost)




module.exports = router