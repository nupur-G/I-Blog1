const SliderModel = require('../../models/Slider')
var cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dkqug51rv',
    api_key: '298748942386567',
    api_secret: '1lloUDb9GHLE86xZCkAeOe6x2Ro'
});
class SliderController {
    static display = async (req, res) => {
        try {
            const sliders = await SliderModel.find();
            // console.log(sliders)
            res.render("admin/slider/display", { s: sliders });
        } catch (error) {
            console.log(error);
        }
    }
    static sliderinsert = async (req, res) => {
        try {
            // form mai multipart-form-data enctype mai first step 
            // console.log(req.files.image)
            const file = req.files.image
            //image upload cloudinary
            const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'sliderimage'
            })
            console.log(imageupload)
            // console.log(req.body);
            const result = new SliderModel({
                Title: req.body.title,
                image: {
                    public_id: imageupload.public_id,
                    url: imageupload.secure_url
                }
            })
            await result.save()
            res.redirect('/admin/slider/display')
        } catch (error) {
            console.log('error')
        }
    }

    static sliderview = async (req, res) => {
        try {
            // console.log(req.params.id);
            const view = await SliderModel.findById(req.params.id)
            res.render('admin/slider/view', { v: view })
        } catch (error) {
            console.log(error)
        }
    }
    static slideredit = async (req, res) => {
        try{
            // console.log(req.params.id);
            const data = await SliderModel.findById(req.params.id);
            res.render('admin/slider/edit', {e: data})
        }catch(error){
            console.log(error);
        }
    }

    static sliderUpdate = async (req, res) => {
        try{
            // console.log(req.files.image)
            if(req.files){
                const slider = await SliderModel.findById(req.params.id)
                const imageid = slider.image.public_id;
                console.log(imageid);
                

                await cloudinary.uploader.destroy(imageid)
                const file = req.files.image

                const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder:'sliderimage'
                })
                var data = {
                    Title: req.body.title,
                    image: {
                        public_id: imageupload.public_id,
                        url: imageupload.secure_url
                    }
                }
            }else{
                var data = {
                    Title: req.body.title,
                }
            }
            // console.log(req.body);
            const update = await SliderModel.findByIdAndUpdate(req.params.id, data)
            res.redirect('/admin/slider/display')
        }catch(error){
            console.log(error)
        }
    }
    static sliderdelete = async (req, res) => {
        try {
            // const slider = await SliderModel.findById(req.params.id)
            // const imageid = slider.image.public_id
            // console.log(imageid)
            // await cloudinary.uploader.destroy(imageid)
            // confirm("Do you really want to delete data ?")
            await SliderModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/slider/display')
        } catch (error) {
            console.log(error)
        }
    }
    
}
module.exports = SliderController;