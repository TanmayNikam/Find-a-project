const Post = require("../models/post")
const Tag = require("../models/tag")
const Comment = require("../models/comment")

const formidable = require("formidable")
const fs = require("fs")
const { pseudoRandomBytes } = require("crypto")


// ------------------------------------------- POST -------------------------------------- //


exports.getPost = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id }).populate('tags')
        // post.image = undfined;
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


exports.fetchPosts = async (req, res) => {
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
        const tags = await Tag.find({})
        let form = new formidable.IncomingForm()
        form.keepExtensions = true;
        
        form.parse(req, async (err, fields, files) => {
            if (err)
                res.status(400).json({ 
                    message: error
                })
            if (files.image && (files.image.size > 5 * 1024 * 1024)) {
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
            let post = new Post({ ...fields, _id:req.user})
            // let post = new Post(fields)

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

exports.editPost = async (req, res) => {
    try {
        
        const tags = await Tag.find({})
        let form = new formidable.IncomingForm()
        form.keepExtensions = true;
        
        form.parse(req, async (err, fields, files) => {
            if (err)
                res.status(400).json({ 
                    message: error
                })
            
            let post = await Post.findOne({_id:req.params.id})
            if (files.image) {
                if(files.image.size > 5 * 1024 * 1024){
                    res.status(400).json({
                        error: "Image file size to large, keep it below 5 mb"
                    })
                }
                else {
                    post.image.data = fs.readFileSync(files.image.filepath)
                    post.image.contentType = files.image.mimetype
                    await post.save()
                }
            }
            if (fields) {
                // console.log({ ...fields })
                console.log(post)
                await Post.findOneAndUpdate({ _id: req.params.id }, { ...fields }, { new: true, runValidators: true })
            }
            post = await Post.findOne({ _id: req.params.id })
            res.status(201).json({
                post
            })
        })
    }
    catch (err) {
        res.status(400).json({
            error:err
        })
    }
}



// ------------------------------------------ Comments ------------------------------------//

exports.addComment = async(req, res) => {
    try {
        let comment = await Comment.create({...req.body,post_id:req.params.id});
        res.status(201).json({
            comment
        })
    }
    catch (err) {
        res.status(404).json({
            error: err
        })
    }
}


exports.getComments = async (req, res) => {
    try {
        let comments = await Comment.find({ post_id: req.params.id }).sort('createdAt')
        res.status(200).json({
            comments
        })
    }
    catch (err) {
        res.status(404).json({
            err
        })
    }
}




// ------------------------------------------- Replies ---------------------------------- //

exports.addReply = async (req, res) => {
    try
    {
        let reply = new Comment({ ...req.body, post_id: req.params.id })
        await Comment.findOneAndUpdate({ _id: req.params.id }, { "$push": { replies: reply } },{new:true, runValidators:true})
        .then(data => {
            res.status(201).json({
            data
        })
        })
    }
    catch (err){
        res.status(400).json({
                error:err
        })
    }
}



//  Method not required 
exports.getReplies = async (req, res) => {
    try {
        let commentReplies = await Comment.find({ _id: req.params.id },{replies:1,_id:0}).sort('createdAt')
        res.status(200).json({
            replies: commentReplies
        })
    }
    catch (err) {
        res.status(400).json({
            error:err
        })
    }
}



// ------------------------- Feed -----------------------------//

exports.getFeed = async (req, res)=> {
    
}































// ------------------------------------- Follow ------------------------------//