const express = require("express")
const router = express.Router()
const postController  = require("../controllers/post")


router.route("/post")
    .post(postController.addPost)
    .get(postController.fetchPosts)


router.route("/post/:id")
    .get(postController.getPost)
    .patch(postController.editPost)


router.route("/post/:id/comments")
    .patch(postController.addComment)
    .get(postController.getComments)


router.route("/post/comment/:id")
    .post(postController.addReply)
    .get(postController.getReplies)


router.route("/feed")
    .get(postController.getFeed)



module.exports = router