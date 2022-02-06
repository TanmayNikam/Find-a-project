require('dotenv').config({
    path:'../.env'
})
const passport = require("passport")
const {Strategy} = require("passport-google-oauth20")
const { response } = require('../app')
const {ObjectId} = require("mongoose").Schema
const User = require("../models/user")
// -------------------------------------- Passport ------------------------------------------ // 

exports.verifyCallback = (accessToken, refreshToken, profile, done) => {
    User.findOne({ _id: profile.id }, (err, data) => {
        if (!data) {
            // User.create({username:profile.emails[0].value,gid:profile.id, fname: profile.name.givenName, lname: profile.name.familyName, email: profile.emails[0].value, photo: profile.photos[0].value })
            let user = new User({gid:profile.id, fname: profile.name.givenName, lname: profile.name.familyName, email: profile.emails[0].value, photo: profile.photos[0].value })
            user.save()
        }
        done(null,profile)
    })
}


exports.serializeUser = (user,done) => {
    done(null, user.id);
}

exports.deserializeUser = (obj, done) => {
    done(null, obj);
}


exports.isLoggedIn = (req, res, next) => {
    const val = req.isAuthenticated() && req.user;
    if (!val) {
        return res.status(401).json({
            message: "Please log in"
        })
    }
    next()
}


exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
}