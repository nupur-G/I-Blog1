const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
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
const BlogModel = mongoose.model('blog', BlogSchema)
module.exports = BlogModel
