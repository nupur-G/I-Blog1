const CategoryModel = require("../../models/Category")
const BlogModel = require('../../models/Blog')
var cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'denizidjz', 
    api_key: '373785668243758', 
    api_secret: 'aKOK54OYAHGiWauC4MMWxd_boZQ' 
  });

class BlogController {
    static display = async (req, res) => {
        try {
            const blogs = await BlogModel.find()
            // console.log(blogs)
            const category = await CategoryModel.find();
            res.render('admin/blog/display', { c: category, b: blogs })
        } catch (error) {
            console.log(error)
        }
    }
    static bloginsert = async (req, res) => {
        try {
            // console.log('hello insert')
            // console.log(req.body)
            // console.log(req.files.image)
            const file = req.files.image
            //image upload on cloudinary
            const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'blogimage'
            })
            // console.log(imageupload)
            const result = new BlogModel({
                    cname: req.body.Category,
                    Title: req.body.title,
                    description: req.body.des,
                    Posted_on: req.body.post_on,
                    image:{
                        public_id: imageupload.public_id,
                        url:imageupload.secure_url
                    }
                })      
                await result.save()
                res.redirect('/admin/blog/display')            
            } catch (error) {
            console.log(error)
        }
    }
    static blogEdit = async (req, res) => {
        try {
            // console.log(req.params.id)
            const data = await BlogModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/edit', { d: data })
        } catch (error) {
            console.log(error)
        }
    }
    static blogUpdate = async (req, res) => {
        try {
            // console.log(req.files.image)
            if(req.files){
                const blog = await BlogModel.findById(req.params.id)
                const imageid = blog.image.public_id
                // console.log(imageid)

                // this condition uses to destroy old photo
                await cloudinary.uploader.destroy(imageid)
                const file = req.files.image
                //image upload on cloudinary
                const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'blogimage'
                })
                var data = {
                    cname: req.body.Category,
                    Title: req.body.title,
                    description: req.body.des,
                    Posted_on: req.body.post_on,
                    image:{
                        public_id: imageupload.public_id,
                        url:imageupload.secure_url
                    }
                }
                
            }else{
                var data = {
                    cname: req.body.Category,
                    Title: req.body.title,
                    description: req.body.des,
                    Posted_on: req.body.post_on,
                }
            }
            // console.log(req.body)
            const result = await BlogModel.findByIdAndUpdate(req.params.id, data)
            // console.log(result)
            res.redirect('/admin/blog/display')
        } catch (error) {
            console.log(error);
        }
    }
    static blogview = async (req, res) => {
        try {
            // console.log(req.params.id)
            const data = await BlogModel.findById(req.params.id)
            res.render("admin/blog/view", { d: data })
        } catch (error) {
            console.log(error)
        }
    }
    static blogDelete = async (req, res) => {
        try {
            const blog = await BlogModel.findById(req.params.id)
            const imageid = blog.image.public_id
            // console.log(imageid)
            await cloudinary.uploader.destroy(imageid)
            // confirm("Do you really want to delete data ?")
            await BlogModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/blog/display')
        } catch (error) {
            console.log(error)
        }
    }
    
}
// title , description , category , Action 
module.exports = BlogController
