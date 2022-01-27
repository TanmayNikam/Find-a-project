const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema 


const commentSchema = new mongoose.Schema({
    comment: {
        type: String, 
        required: true,
        trim: true,
        ref: 'Post'
    },
    replies: {
        type: [this],
        default: []
    }
})


module.exports = mongoose.model('Comment', commentSchema);