const router = require("express").Router();
const {mysql2} = require("../../config/database")


const getTransactionDetailRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetTransactionDetail = "select * from transactiondetail";

      const sqlTotalSold = `select sum(quantity) AS total_sold from transactiondetail where statusTransactionDetail = "complete";`
  
      const [result] = await connection.query(sqlGetTransactionDetail);

      const [totalSold] = await connection.query(sqlTotalSold)

      connection.release();
  
      res.status(200).send({result, totalSold});
    } catch (error) {
      next(error)
    }
  };

  // get transaction detail by category

  const getTransactionDetailCategoryRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlCategoryDetail = `select productCategory, sum(quantity) as total_bought from transactiondetail where statusTransactionDetail ="complete" group by productCategory;`
  
      

      const [categoryDetail] = await connection.query(sqlCategoryDetail)

      connection.release();
  
      res.status(200).send(categoryDetail);
    } catch (error) {
      next(error)
    }
  };

  const getTransactionDetailByIdRouter =  async (req, res, next) => {
    try {
      const connection = await mysql2.promise().getConnection()
  
      const sqlGetTransactionDetail = `select * from transactiondetail where transaction_id = ? group by id;`

      const [result] = await connection.query(sqlGetTransactionDetail, req.params.transactionId);

     

     
      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      next(error)
    }
  };





  router.get("/category", getTransactionDetailCategoryRouter)
  router.get("/:transactionId", getTransactionDetailByIdRouter)
  router.get("/", getTransactionDetailRouter)

  module.exports = router;