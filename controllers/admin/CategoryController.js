const  CategoryModel = require('../../models/Category')
class CategoryController {
     static display = async (req, res) => {
        try{
          const data = await CategoryModel.find();
               // console.log(data)
            res.render('admin/category/display', {d: data})
        }catch(error){
             console.log(error)
        }
     }
     static categoryinsert = async (req, res) => {
          try{
               // console.log('hello insert')
               // console.log(req.body)
               const result = new CategoryModel({
                    cname: req.body.categoryname,
                    Title: req.body.title
               })
               await result.save()
               res.redirect('/admin/category/display')
          }catch(error){
               console.log(error)
          }
     }
     static categoryview = async(req, res) => {
          try{
               // console.log(req.params.id)
               const data = await CategoryModel.findById(req.params.id)
               // console.log(data)
               res.render('admin/category/view', {d: data})
          }catch(error){

               console.log(error)
          }
     }
     static categoryedit = async (req, res) => {
          try{
               // console.log(req.params.id)
               const data = await CategoryModel.findById(req.params.id);
               // console.log(data)
               res.render('admin/category/edit', {d: data})
          }catch(error){
               console.log(error)
          }
     }
     static categoryupdate = async (req, res) => {
          try{
               // console.log(req.body)
               const data = await CategoryModel.findByIdAndUpdate(req.params.id, {
                    cname: req.body.categoryname, 
                    Title: req.body.title
               })
               res.redirect("/admin/category/display")
          }catch(error){
               console.log(error)
          }
     }
     static categorydelete = async (req, res) => {
          try{
               // console.log(req.params.id)
               const data = await CategoryModel.findByIdAndDelete(req.params.id)
               res.redirect('/admin/category/display')
          }catch(error) {
               console.log(error)
          }
     }
}
module.exports = CategoryController