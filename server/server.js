require("dotenv").config()
const fs = require("fs")
const https = require("https")
const mongoose = require("mongoose")


mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Database Connected Succesfully")
    })
    .catch(err => {
        console.log(err)
    })



const app = require("./app")

app.listen(process.env.PORT, (err) => { 
    if (err) console.log(err)
    else console.log(`Server started listening on port ${process.env.PORT}`);
})


// https.createServer({
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// },app).listen(process.env.PORT, (err) => {
//     if (err) console.log(err);
//     else
//         console.log(`Server started on ${process.env.PORT}`)
// })
// GET /auth/google/callback?code=4%2F0AX4XfWi5hsZieSN2Q9Q9SXZhEt7BknFIg-0Ydkzp01AwKnMJINAxkRO9pW6aTW8Ua4UqeQ&scope=email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=consent - - ms - -