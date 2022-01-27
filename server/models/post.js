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
    comments: {
        type: [ObjectId],
        default: [],
        ref:'Comment'
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
    }
},{timestamps:true})


module.exports = mongoose.model('Post', postSchema);