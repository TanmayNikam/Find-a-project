const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema 

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        trim:true
    },
    content: {
        type: String,
        required: true,
        trim:true
    },
    tags: {
        type: ObjectId,
        ref: 'Tag',
        required:true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    image: {
        data: Buffer,
        contentType:String
    },
    user_id: { 
        type: ObjectId,
        ref:'User'
    }
},{timestamps:true})


module.exports = mongoose.model('Post', postSchema);