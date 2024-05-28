const express = require('express');
const FrontController = require('../controllers/FrontController');
const AdminController = require('../controllers/admin/AdminController');
const BlogController = require('../controllers/admin/BlogController');
const CategoryController = require('../controllers/admin/CategoryController');
const AboutController = require('../controllers/admin/AboutController');
const SliderController = require('../controllers/admin/SliderController');
const ContactController = require('../controllers/admin/ContactController');
const checkAuth = require('../Middleware/auth');
const route = express.Router()

// Frontcontroller 
route.get('/', FrontController.home)
route.get('/about', FrontController.about)
route.get('/contact', FrontController.contact)
route.get('/blog', FrontController.blog)
route.get('/login', FrontController.login)
route.get('/detail/:id' , FrontController.detail)
route.get('/bloglist/:name', FrontController.bloglist)

//registration form 
route.get('/registration', FrontController.registration)
route.post('/admininsert', FrontController.admininsert)
route.post('/verifylogin', FrontController.verifylogin)
route.get("/logout",FrontController.logout)

//admin/AdminController
route.get('/admin/dashboard', checkAuth,AdminController.dashboard)


//admin/BlogController
route.get('/admin/blog/display',checkAuth, BlogController.display)
route.post('/bloginsert', checkAuth,BlogController.bloginsert)
route.get('/blogEdit/:id', checkAuth,BlogController.blogEdit)
route.post("/blogUpdate/:id", checkAuth, BlogController.blogUpdate)
route.get("/blogview/:id",checkAuth, BlogController.blogview)
route.get("/blogDelete/:id",checkAuth, BlogController.blogDelete)

//admin/Categorycontroller
route.get('/admin/category/display',checkAuth, CategoryController.display)
route.post('/categoryinsert', checkAuth,CategoryController.categoryinsert)
route.get('/categoryview/:id',checkAuth, CategoryController.categoryview)
route.get('/categoryedit/:id',checkAuth, CategoryController.categoryedit)
route.post('/categoryupdate/:id',checkAuth, CategoryController.categoryupdate)
route.get('/categorydelete/:id', checkAuth,CategoryController.categorydelete)

// admin/AboutController
route.get('/admin/about/display',checkAuth, AboutController.display)
route.post('/aboutinsert',checkAuth,AboutController.aboutinsert)
route.get('/aboutView/:id',checkAuth,AboutController.aboutView)
route.get('/aboutEdit/:id', checkAuth, AboutController.aboutEdit)
route.post('/aboutUpdate/:id',checkAuth, AboutController.aboutUpdate)
route.get('/aboutdelete/:id', checkAuth, AboutController.aboutDelete)


//admin/slidercontroller
route.get('/admin/slider/display',checkAuth,SliderController.display)
route.post('/sliderinsert',checkAuth, SliderController.sliderinsert)
route.get('/sliderview/:id', checkAuth, SliderController.sliderview)
route.get('/slideredit/:id', checkAuth, SliderController.slideredit)
route.post('/sliderUpdate/:id',checkAuth, SliderController.sliderUpdate)
route.get('/sliderdelete/:id', checkAuth, SliderController.sliderdelete)
 
//admin/contactController
route.get('/admin/contact/display',checkAuth, ContactController.display)
route.post('/contactinsert', checkAuth,ContactController.contactinsert)


module.exports = route;