const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema 


const commentSchema = new mongoose.Schema({

        // post_id
        // comment_id
        // comment
        // reply

    comment: {
        type: String, 
        required: true,
        trim: true,
        ref: 'Post'
    },
    post_id: {
        type: ObjectId,
        required: true
    },
    user_id: { 
        type: ObjectId,
        ref:'User'
    },
    replies: {
        type: [this],
        default: []
    }
}, { timestamps:true})


module.exports = mongoose.model('Comment', commentSchema);