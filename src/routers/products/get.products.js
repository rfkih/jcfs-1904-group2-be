const router = require("express").Router();
const {mysql2} = require("../../config/database");


//Get All Product

const getProductRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetProducts = "select id, category_id, productName, productDetails, productIMG, isLiquid, price from products";
  
     
      const [result] = await connection.query(sqlGetProducts);
      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      next(error)
    }
  };


  //Get Product By id
  const getProductByIdRouter = async (req, res, next) => {

    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetProductsById = "select id, category_id, productName, productDetails, productIMG, isLiquid, price from products WHERE id = ?";
      const [result] = await connection.query(sqlGetProductsById, req.params.productsId);
      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      next(error)
    }
  };



  router.get("/:productsId", getProductByIdRouter)
  router.get("/", getProductRouter)

  module.exports = router;