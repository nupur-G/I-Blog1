const BlogModel = require("../models/Blog")
const CategoryModel = require("../models/Category")
const AdminModel = require('../models/Admin')
const bcrypt = require('bcrypt')//password 
const jwt = require('jsonwebtoken')
const AboutModel = require("../models/About")
class FrontController {

    static home = async (req, res) => {
        try {
            const blog = await BlogModel.find().sort({ _id: -1 }).limit(6)
            res.render("home", { b: blog })
        } catch (error) {
            console.log(error)
        }
    }

    static about = async (req, res) => {
        try {
            const about = await AboutModel.find().sort({_id: -1}).limit(6)
            res.render('about', {a: about})
        } catch (error) {
            console.log(error)
        }
    }
    static bloglist = async (req, res) => {
        try {
            const n = req.params.name
            // console.log(n);
            const bloglist = await BlogModel.find({cname:n})
            // console.log(bloglist)
            res.render('bloglist',{d:bloglist})
        } catch (error) {
            console.log(error)
        }
    }
    static contact = async (req, res) => {
        try {
            res.render('contact')
        } catch (error) {
            console.log(error)
        }
    }

    static blog = async (req, res) => {
        try {
            const blog = await BlogModel.find().sort({ id: -1 })
            res.render('blog', { b: blog })
        } catch (error) {
            console.log(error)
        }
    }
    static login = async (req, res) => {
        try {
            res.render('login', {message: req.flash('error')})
        } catch (error) {
            console.log(error)
        }
    }
    static verifylogin = async (req, res) => {
        try{
            // console.log(req.body);
            const {email , password} = req.body
            if(email && password){
            //    now we need to check the person is trying to login , must have right password and email
                const admin = await AdminModel.findOne({email: email})
                if(admin != null){
                    const ismatch = await bcrypt.compare(password, admin.password)
                    if(ismatch){
                        // generate token
                        const token = jwt.sign({id: admin._id},'ishika12345678agarwal')
                        // console.log(token)
                        res.cookie('token', token)
                        res.redirect('/admin/dashboard')
                    }else{
                        req.flash('error', 'Email or Password is incorrect')
                        res.redirect('/login')
                    }  
                }else{
                    req.flash('error', 'you are not register user');
                    res.redirect('/login');
                }
            }else{
                req.flash('error', 'all fields are required');
                res.redirect('/login')
            }
        }catch(error){
            console.log(error);
        }
    }
    static detail = async (req, res) => {
        try {
            const detail = await BlogModel.findById(req.params.id)
            const recentblog = await BlogModel.find().sort({ id: -1 }).limit(6)
            const category = await CategoryModel.find().sort({ id: -1 }).limit(6)
            res.render('detail', { d: detail, r: recentblog, c: category })
        } catch (error) {
            console.log(error)
        }
    }

    static registration = async (req, res)=> {
        try{
            res.render('registration')
        }catch(error){
            console.log(error)
        }
    }
    static admininsert = async (req, res) => {
        try{
            console.log(req.body);
            const hashpassword = await bcrypt.hash(req.body.password, 10)
            const result = await AdminModel({
                name: req.body.name,
                email: req.body.email,
                password: hashpassword,
            })
            await result.save()
            res.redirect('/login')
        }catch(error){
            console.log(error)
        }
    }
    static logout = async (req, res) => {
        try{
            res.clearCookie('token')
            res.redirect('/login');
        }catch(error){
            console.log(error);
        }
    }
}
module.exports = FrontController