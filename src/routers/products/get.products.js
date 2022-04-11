const router = require("express").Router();
const {mysql2} = require("../../config/database");


//Get All Product

const getProductRouter =  async (req, res, next) => {

  
    try {
      const connection = await mysql2.promise().getConnection();
      
  
      const sqlGetProducts = "select id, category_id, productName, productDetails, productIMG, isLiquid, price from products where isDeleted = 0 limit  ? offset ?"
      const sqlCountProducts = `SELECT COUNT(*) AS count FROM products where isDeleted = 0;`
      const sqlGetProductsCategory = "select id, category_id, productName, productDetails, productIMG, isLiquid, price from products where category_id = ? && isDeleted = 0 limit  ? offset ?"
      const sqlCountProductsCategory = `SELECT COUNT(*) AS count FROM products where category_id = ? && isDeleted = 0`
      const category_id = req.query.category
      const limit = parseInt(req.query.productPerPage)
      const offset = parseInt(req.query.OFFSET)
     
      
      
     if (category_id) {
      const [result] = await connection.query(sqlGetProductsCategory, [category_id, limit, offset]);
      const [count] = await connection.query(sqlCountProductsCategory, category_id)
       
      connection.release();
      res.status(200).send({result, count});
      


     } else {
      const [result] = await connection.query(sqlGetProducts, [limit, offset ]);
      const [count] = await connection.query(sqlCountProducts)
      connection.release();
      res.status(200).send({result, count});
     }
      
      
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

  // get Deleted Product

  const getDeletedProductRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetDeletedProducts = "select id, category_id, productName, productDetails, productIMG, isLiquid, isDeleted, price from products where isDeleted = 1 limit  ? offset ?";
      const sqlCountDeletedProducts = `SELECT COUNT(*) AS count FROM products where isDeleted = 1;`
      const limit = parseInt(req.query.productPerPage)
      const offset = parseInt(req.query.OFFSET)

     
      const [result] = await connection.query(sqlGetDeletedProducts, [limit, offset]);
      const [count] = await connection.query(sqlCountDeletedProducts)
      connection.release();
  
      res.status(200).send({result, count});
    } catch (error) {
      next(error)
    }
  };

  //get Sold Product

  const getSoldProductRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetSoldProducts = `select product_id, productCategory, productName, sum(quantity) as total_bought from transactiondetail where statusTransactionDetail = "complete" group by product_id, productCategory, productName;`
      
     
      const [result] = await connection.query(sqlGetSoldProducts);
      

      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      next(error)
    }
  };

  router.get("/sold", getSoldProductRouter)
  router.get("/deleted", getDeletedProductRouter)
  router.get("/:productsId", getProductByIdRouter)
  router.get("/", getProductRouter)
 
  module.exports = router;