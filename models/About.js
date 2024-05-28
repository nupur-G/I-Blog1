const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cname: {
        type: String,
        required: true
    },
    Posted_on:{
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String, 
        },
        url: {
            type: String
        }
    },
}, { timestamps: true })
//   timestamps : jese data insert karenge to field provide krega 1.createdat, 2.updatedat
const AboutModel = mongoose.model('about', AboutSchema)
module.exports = AboutModel
