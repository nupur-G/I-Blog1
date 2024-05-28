class AdminController {
    static dashboard  = async (req, res) => {
         try{
            const {name, email } = req.admin
            res.render('admin/dashboard', {n:name, e: email})
         }catch(error){
            console.log(error)
         }
    }
}
module.exports = AdminController