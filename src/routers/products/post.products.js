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
// const multerUploadSingle = upload.single("productPicture")
// const postProductPhotoRouter = router.post(
//     "/upload",
//     multerUploadSingle,
//     (req, res) => {
//       // simpan nama foto
//       // req.file.filename --> nama foto yang baru saja di upload (bukan nama original) (public/photos)
//       const sqlPutUserPhoto = `UPDATE users SET ? WHERE id = ?`;
//       const dataPutUserPhoto = [{ photo: req.file.filename }, req.user.id];
  
//       connection.query(sqlPutUserPhoto, dataPutUserPhoto, (err, result) => {
//         if (err) return res.status(500).send({ err });
  
//         res.status(200).send({ message: "Upload photo success" });
//       });
//     }
//   );
  






router.post("/", postProductRouter)

module.exports = router