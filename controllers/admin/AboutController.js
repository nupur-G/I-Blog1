const CategoryModel = require("../../models/Category");
const AboutModel = require("../../models/About");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dkqug51rv",
  api_key: "298748942386567",
  api_secret: "1lloUDb9GHLE86xZCkAeOe6x2Ro",
});

class AboutController {
  static display = async (req, res) => {
    try {
      const about = await AboutModel.find();
      const category = await CategoryModel.find();
      res.render("admin/about/display", { c: category, a: about });
    } catch (error) {
      console.log(error);
    }
  };

  static aboutinsert = async (req, res) => {
    try {
      // console.log(req.files.image);
      // console.log(req.body)

      const file = req.files.image;
      const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "aboutimage",
      });
      console.log(imageupload);

      const result = new AboutModel({
        cname: req.body.categoryname,
        Title: req.body.title,
        description: req.body.des,
        Posted_on: req.body.post_on,
        image: {
          public_id: imageupload.public_id,
          url: imageupload.secure_url,
        },
      });
      await result.save();
      res.redirect("/admin/about/display");
    } catch (error) {
      console.log(error);
    }
  };

  static aboutView = async (req, res) => {
    try {
      // console.log(req.params.id);
      const data = await AboutModel.findById(req.params.id);
      res.render("admin/about/view", { d: data });
    } catch (error) {
      console.log(error);
    }
  };

  static aboutEdit = async (req, res) => {
    try {
      const data = await AboutModel.findById(req.params.id);
      res.render("admin/about/edit", { d: data });
    } catch (error) {
      console.log(error);
    }
  };

  static aboutUpdate = async (req, res) => {
    try {
      if (req.files) {
        const about = await AboutModel.findById(req.params.id);
        const imageid = about.image.public_id;
        // console.log(imageid)

        // used to destroy old photo
        await cloudinary.uploader.destroy(imageid);
        const file = req.files.image;
        // image upload on cloudinary

        const imageupload = await cloudinary.uploader.upload(
          file.tempFilePath,
          {
            folder: "aboutimage",
          }
        );
        var data = {
          cname: req.body.categoryname,
          Title: req.body.title,
          description: req.body.des,
          Posted_on: req.body.post_on,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          cname: req.body.Category,
          Title: req.body.title,
          description: req.body.des,
          Posted_on: req.body.post_on,
        };
      }
      // console.log(req.body)
      const result = await AboutModel.findByIdAndUpdate(req.params.id, data);
      res.redirect("/admin/about/display");
    } catch (error) {
      console.log(error);
    }
  };

  static aboutDelete = async (req, res) => {
    try {
      const about = await AboutModel.findById(req.params.id);
      const imageid = about.image.public_id;
      // destroy photo
      await cloudinary.uploader.destroy(imageid);
      await AboutModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/about/display");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = AboutController;
