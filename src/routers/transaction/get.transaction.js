const router = require("express").Router();
const {mysql2} = require("../../config/database");

//Get all transaction
const getTransactionRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetTransaction = "select * from transaction";
  
      const [result] = await connection.query(sqlGetTransaction);

      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      next(error)
    }
  };

//Get Completed transaction
  const getSumCompletedTransactionRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  

      const sqlGetTotalPrice = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = "complete"`

      const sqlGetTotalPriceThirty = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = "complete" and created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);`

      const sqlGetTotalPriceSeven = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = "complete" and created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);`

      const sqlGetTotalPriceToday = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = "complete" and created_at >= CURDATE();`


      const [sumResultAll] = await connection.query(sqlGetTotalPrice);
      const [sumResultThirty] = await connection.query(sqlGetTotalPriceThirty)
      const [sumResultSeven] = await connection.query(sqlGetTotalPriceSeven)
      const [sumResultToday] = await connection.query(sqlGetTotalPriceToday)
        
      connection.release();
  
      res.status(200).send({sumResultAll, sumResultThirty, sumResultSeven, sumResultToday});
    } catch (error) {
      next(error)
    }
  };





  


  router.get("/completed", getSumCompletedTransactionRouter)
  
  
  router.get("/", getTransactionRouter)

  module.exports = router;