const mongoose = require('mongoose')


const ContactSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String, 
        required: true
    },
    Message: {
        type: String,
        required: true
    }
},{timestamps:true})

const ContactModel = mongoose.model('contact',ContactSchema)
module.exports = ContactModel;