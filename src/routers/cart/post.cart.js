const router = require("express").Router();
const pool = require("../../config/database");




const postProductToCart =  async (req, res, next) => {
    try {

        const connection = await pool.promise().getConnection()


        const sqlPostCart = "INSERT INTO cart SET ?";

        const dataProduct = [
            {
              category_id: req.body.newProduct.category_id,
              productName: req.body.newProduct.productName,
              productDetails: req.body.newProduct.productDetails,
              productIMG: req.body.newProduct.productIMG,
              isLiquid: req.body.newProduct.isLiquid,
              isDeleted: req.body.newProduct.isDeleted,
              price: req.body.newProduct.price,
            },
          ];
    
     
     
        const [result] = await connection.query(sqlPutQuantity);
      
      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      next(error)
    }
  };



  router.post("/", postProductToCart);


module.exports = router;
