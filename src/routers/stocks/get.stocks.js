const router = require("express").Router();
const {mysql2} = require("../../config/database");

const getStocksRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetStocks = "select * from stocks WHERE product_id = ?";
  
     
      const [result] = await connection.query(sqlGetStocks, req.params.productsId);
      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      next(error)
    }
  };

  router.get("/:productsId", getStocksRouter)

  module.exports = router;