const router = require("express").Router();
const pool = require("../../config/database");




const putAddressRouter =  async (req, res, next) => {  
    try {
        const connection = await pool.promise().getConnection();
       
        const sqlInputAddress = `UPDATE transaction SET address_id = ${req.body.firstAddress.id} where id = ${req.params.transactionId}`;

        const [result] = await connection.query(sqlInputAddress);
        connection.release();
        res.status(200).send(result);
         
    } catch (error) {
      next(error)
    }
};



const putTransactionStatusRouter =  async (req, res, next) => {  
  try {
      const connection = await pool.promise().getConnection();
     
      const sqlInputAddress = `UPDATE transaction SET transactionStatus = '${req.body.params.status}' where id = ${req.params.transactionId}`;

      const [result] = await connection.query(sqlInputAddress);
      connection.release();
      res.status(200).send(result);
       
  } catch (error) {
    next(error)
  }
};


router.put("/status/:transactionId", putTransactionStatusRouter)
router.put("/:transactionId", putAddressRouter)

module.exports = router;