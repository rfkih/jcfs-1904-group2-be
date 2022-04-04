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
  const getCompletedTransactionRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetCompletedTransaction = `select * from transaction where transactionStatus = ?`;
      const data = "complete"
  
      const [result] = await connection.query(sqlGetCompletedTransaction, data);
      
      const sqlGetTotalPrice = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = ?`

      const [sumResult] = await connection.query(sqlGetTotalPrice, data);

        
      connection.release();
  
      res.status(200).send({result, sumResult});
    } catch (error) {
      next(error)
    }
  };


//Get Completed transaction Last 30 day

const getCompletedTransactionthirtyRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetCompletedTransaction = `select * from transaction where transactionStatus = "complete" and created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);`;
      
  
      const [result] = await connection.query(sqlGetCompletedTransaction);
      
      const sqlGetTotalPrice = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = "complete" and created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);`

      const [sumResult] = await connection.query(sqlGetTotalPrice); 
        
      connection.release();
  
      res.status(200).send({result, sumResult});
    } catch (error) {
      next(error)
    }
  };

  //Get Completed transaction Last 7 day

  const getCompletedTransactionsevenRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetCompletedTransaction = `select * from transaction where transactionStatus = "complete" and created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);`;
      
  
      const [result] = await connection.query(sqlGetCompletedTransaction);
      
      const sqlGetTotalPrice = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = "complete" and created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);`

      const [sumResult] = await connection.query(sqlGetTotalPrice);
        
        
      connection.release();
  
      res.status(200).send({result, sumResult});
    } catch (error) {
      next(error)
    }
  };

    //Get Completed transaction today



    const getCompletedTransactiontodayRouter =  async (req, res, next) => {
        try {
            const connection = await mysql2.promise().getConnection()
      
          const sqlGetCompletedTransaction = `select * from transaction where transactionStatus = "complete" and created_at >= CURDATE();`;
          
      
          const [result] = await connection.query(sqlGetCompletedTransaction);
          
          
          const sqlGetTotalPrice = `select sum(totalPrice) AS total_revenue from transaction where transactionStatus = "complete" and created_at >= CURDATE();`
    
          const [sumResult] = await connection.query(sqlGetTotalPrice);
          
            
          connection.release();
      
          res.status(200).send({result, sumResult});
        } catch (error) {
          next(error)
        }
      };
    
    





  

  router.get("/completed/today", getCompletedTransactiontodayRouter)
  router.get("/completed", getCompletedTransactionRouter)
  router.get("/completed/seven", getCompletedTransactionsevenRouter)
  router.get("/completed/thirty", getCompletedTransactionthirtyRouter)
  
  router.get("/", getTransactionRouter)

  module.exports = router;