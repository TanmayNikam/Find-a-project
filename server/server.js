require("dotenv").config()
const fs = require("fs")
const https = require("https")
const mongoose = require("mongoose")


mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Database Connected Succesfully")
    })
    .catch(err => {
        console.log(err)
    })


const app = require("./app")

// app.listen(process.env.PORT, (err) => { 
//     if (err) console.log(err)
//     else console.log(`Server started listening on port ${process.env.PORT}`);
// })


https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
},app).listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    else
        console.log(`Server started on ${process.env.PORT}`)
})
