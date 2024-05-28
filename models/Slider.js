const mongoose = require('mongoose')

const SliderSchema = new mongoose.Schema({
    Title: {
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
const SliderModel = mongoose.model('slider', SliderSchema)
module.exports = SliderModel
