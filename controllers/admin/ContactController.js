const ContactModel = require('../../models/Contact')

class ContactController {
    static display = async (req, res) => {
        try{
            const contactdata = await ContactModel.find()
            res.render('admin/contact/display', {c: contactdata})
        }catch(error){
            console.log(error);
        }
    }
    static contactinsert = async (req, res) => {
        try{
            // console.log(req.body);
            const {name, email, phone, message} = req.body;
            if(name && email && phone && message){

                const result = new ContactModel({
                    Name: req.body.name,
                    Email: req.body.email,
                    Phone: req.body.phone,
                    Message: req.body.message
                })
                await result.save()
                res.render('contact')
            }else{
                // res.redirect('/contact')
            }
        }catch(error){
            console.log(error)
        }
    }
}

module.exports= ContactController;