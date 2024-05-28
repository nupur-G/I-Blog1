// Database creation require and call this function in app.js
const mongoose = require('mongoose')
localurl = "mongodb://127.0.0.1:27017/Blog_1";
liveUrl ="mongodb+srv://guptanupur867:gupta123@blog-app.wjjq8yj.mongodb.net/blog?retryWrites=true&w=majority&appName=blog-app"


const connectDB = () => {
    return mongoose.connect(liveUrl) // mongoose.connect hime return mai promise deta hai
    .then(() => {
        console.log('connected successfully')
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports = connectDB