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



  router.get("/", getTransactionDetailRouter)

  module.exports = router;