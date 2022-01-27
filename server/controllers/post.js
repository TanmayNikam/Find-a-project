const Post = require("../models/post")
const Tag = require("../models/tag")
const formidable = require("formidable")
const fs = require("fs")
const tag = require("../models/tag")

// populate tags not working and get post by id too


exports.getPost = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id }).populate("tags")
        post.image = undfined;
        res.status(200).json({
            post
        })
    }
    catch (err) {
        res.status(400).json({
            error: err
        })
    }
}


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("tags")
        posts.forEach(el => {
            el.image = undefined;
        })
        res.status(200).json({
            data: posts
        })
    }
    catch (err) {
        res.status(404).json({
            error:err
        })
    }
}

exports.addPost = async (req, res) => {
    try {
        const tags = await Tag.find({}).populate('tags')
        let form = new formidable.IncomingForm()
        form.keepExtensions = true;
        
        form.parse(req, async (err, fields, files) => {
            
            if (err)
                res.status(400).json({ 
                    message: error
                })
            if (files.image.size > 5 * 1024 * 1024) {
                res.status(400).json({
                    error: "Image file size to large, keep it below 5 mb"
                })
            }
            if (!fields.title || !fields.content || !fields.tags) {
                res.status(400).json({
                    message: "Please fill the missing Fields"
                })
            }
            
            // console.log(fields.tags)
            fields.tags = tags.find((ele) => (ele.name == fields.tags.toLowerCase()))._id
            let post = new Post(fields)

            if (files.image) {
                post.image.data = fs.readFileSync(files.image.filepath)
                post.image.contentType = files.image.mimetype
            }

            await post.save()
                .then(data=>{ 
                    res.status(201).json({
                        data
                })
            })


        })
    }
    catch (err) {
        res.status(400).json({
            error: err
        })
    }
}