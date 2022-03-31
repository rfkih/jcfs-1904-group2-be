const router = require("express").Router();
const {mysql2} = require("../../config/database");
const upload = require("../../services/upload")
const uploadProductPhoto = require("../../services/upload")


//Post Product

const postProductRouter =  async (req, res, next) => {

    try {
        const connection = await mysql2.promise().getConnection()

        const sqlPostProduct = "INSERT INTO products SET ?";

        const data = req.body


        try {
           const result =  await connection.query(sqlPostProduct, data,) 
           console.log({result})
            res.status(201).send({
                message: `Data Produk : ${req.body.productName } berhasil ditambahkan`,
                productId : `${result[0].insertId}`
            });

     
        } catch (error) {
            next(error)
        } 
    } catch (error) {
        next(error);
    }
};

//Upload Photo
const multerUploadSingle = upload.uploadProductPhoto.single("productPhoto")

const postProductPhotoRouter = async (req, res) => {
    let finalImageURL = req.protocol + "://" + req.get("host") + "/productPicture/" + req.file.filename;

    res.json({status: "success", image: finalImageURL})
   
  }


router.post("/", postProductRouter)
router.post("/upload", multerUploadSingle, postProductPhotoRouter)

module.exports = router