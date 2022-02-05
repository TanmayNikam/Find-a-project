require('dotenv').config({
    path:'../.env'
})


exports.sessionOptions = {
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys:[process.env.SECRET1,process.env.SECRET2]
}



exports.authOptions =  {
    clientID: process.env.O_AUTH_CLIENT_ID,
    clientSecret: process.env.O_AUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}

exports.callbackOptions = {
    failureRedirect: "/failure",
    successRedirect: "/home",
    session: true
}

exports.scopes = {
    scope:['email','profile']
}



