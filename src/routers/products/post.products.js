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

        console.log(data);

        try {
           const result =  await connection.query(sqlPostProduct, data,) 
           
            res.status(201).send({
                message: `Data Produk : ${req.body.productName } berhasil ditambahkan`,
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
    let finalImageURL = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

    res.json({status: "success", image: finalImageURL})
    // res.send({data: req.body})
    // simpan nama foto
    // req.file.filename --> nama foto yang baru saja di upload (bukan nama original) (public/photos)
    // const sqlPutProductPhoto = `UPDATE products SET ? WHERE id = ?`;
    // const dataPutProductPhoto = [{ photo: req.file.filename }, req.body.id];


    // const connection = await mysql2.promise().getConnection()

    // connection.query(sqlPutProductPhoto, dataPutProductPhoto, (err, result) => {
    //   if (err) return res.status(500).send({ err });

    //   res.status(200).send({ message: "Upload photo success" });
    // });l
  }


router.post("/", postProductRouter)
router.post("/upload", multerUploadSingle, postProductPhotoRouter)

module.exports = router