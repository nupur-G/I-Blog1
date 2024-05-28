const jwt = require('jsonwebtoken')
const AdminModel = require('../models/Admin')

const checkAuth = async (req, res, next)=> {
    // console.log('hello security');
    const {token}= req.cookies
    // console.log(token)
    if(!token){
        req.flash('error', 'unauthorized login')
        res.redirect('/login')
    }else{
        const data = jwt.verify(token, 'ishika12345678agarwal')
        // console.log(data)
        const admin = await AdminModel.findOne({_id: data.id})
        // console.log(admin)
        req.admin = admin
        next() 
    }
} 
module.exports = checkAuth;