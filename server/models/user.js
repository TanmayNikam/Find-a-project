const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const validator = require("validator")
const {ObjectId} = mongoose.Schema


const userSchema = new mongoose.Schema({
    gid: {
        type: String,
        required: true,
        unique:true
    },
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    lname: {
        type: String,
        trim:true
    },
    email: {
        type: String,
        required: [true, "A user must have an email"],
        trim: true,
        unique: true,
        validate:[validator.isEmail,"Email provided is invalid"]
    },
    photo: {
      type:String  
    },
    follower: {
        type: [ObjectId],
        default:[]
    }
})






















module.exports = mongoose.model('User', userSchema);