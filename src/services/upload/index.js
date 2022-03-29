const multer = require("multer");
const path = require('path')

const storageProductPhoto = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../../public/productPicture')
    },

    filename: (req, file, cb) => {
        console.log(file)
        cb(null, `${req.products.productName}-photo.png` )
    }
})

const uploadProductPhoto = multer({ 
    storage: storageProductPhoto,
    limits: {
        fileSize: 10000000, // Byte, 10MB
      },
      fileFilter(req, file, cb) {
        const allowedExtension = [".png", ".jpg", ".jpeg"];
        // ktp.jpg
        // extname : .jpg
        const extname = path.extname(file.originalname);
        // Jika extension yang diupload tidak sesuai dengan isi dari allowedExtension
        if (!allowedExtension.includes(extname))
          return cb(new Error("Please upload image file (jpg, jpeg, png)"));
    
        cb(null, true);
      },
})


module.exports = { uploadProductPhoto };
