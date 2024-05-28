const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })
//   timestamps : jese data insert karenge to field provide krega 1.createdat, 2.updatedat
const AdminModel = mongoose.model('admin', AdminSchema)
module.exports = AdminModel
