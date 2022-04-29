const router = require("express").Router();
const pool = require("../../config/database");




const putAddressRouter =  async (req, res, next) => {

    console.log(req.params.addressId);
    
    try {
        const connection = await pool.promise().getConnection();
       
        const sqlInputAddress = `UPDATE transaction SET address_id = ${req.params.addressId} where id = 59`;

        const [result] = await connection.query(sqlInputAddress);
        connection.release();
        res.status(200).send(result);
      
      
  
      
    } catch (error) {
      next(error)
    }
   
};



router.put("/:addressId", putAddressRouter)

module.exports = router;