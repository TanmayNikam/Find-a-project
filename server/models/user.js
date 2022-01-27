const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const validator = require("validator")
const {ObjectId} = mongoose.Schema 


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "A user must have an email"],
        trim: true,
        unique: true,
        validate:[validator.isEmail,"Email provided is invalid"]
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
        select: false,
        minLength: 8
    },
    posts: {
        type: [ObjectId],
        default: [],
        ref:'Post'
    },
    follower: {
        type: [this],
        default:[]
    }
})
























module.exports = mongoose.model('User', userSchema);