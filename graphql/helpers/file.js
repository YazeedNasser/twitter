const multer = require('multer');
const path = require('path');

class FileHelper {
    setStorage() {
        return multer.diskStorage({
            destination: '../public/Uploads',
            filename: function(_req, file, cb){
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        });
    }

    checkFileExt(file, cb) {
        const fileTypes = /jpg|png|jpeg|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype= fileTypes.test(file.mimetype);

        if(mimetype && extname){
            return cb(null, true)
        }else{
            cb('ERRORS: Images Only');
        }
    }

    upload(req, res) {
        const self = this;
        const upload = multer({
            storage: this.setStorage(),
            // limits: { fieldSize: 3000000 },
            fileFilter: function(req, file, cb){
                self.checkFileExt(file, cb);
            }
        }).any();
        return upload(req, res, err => {
            if(err) {
                console.log(err);
            }else {
                console.log("Image Uploaded Successfully!")
            }
        });;
        }
    }

    /*
(req, res, err => {
            if(err) {
                console.log(err);
            }else {
                console.log("Image Uploaded Successfully!")
            }
        });

    */

module.exports= new FileHelper();