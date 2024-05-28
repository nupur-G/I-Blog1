// Database creation require and call this function in app.js
const mongoose = require('mongoose')
localurl = "mongodb://127.0.0.1:27017/Blog_1";


const connectDB = () => {
    return mongoose.connect(localurl) // mongoose.connect hime return mai promise deta hai
    .then(() => {
        console.log('connected successfully')
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports = connectDB