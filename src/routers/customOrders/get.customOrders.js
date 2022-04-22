const router = require("express").Router();
const pool = require("../../config/database");



const getCustomOrderRouter =  async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection()
  
      const sqlGetOrder = `select * from custom_order where status = 'waiting';`;
      
  
      const [result] = await connection.query(sqlGetOrder);
     
      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      next(error)
    }
  };


  const getCustomOrderByIdRouter =  async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection()

      console.log(req.query);
      console.log(req.params);
  
      const sqlGetOrder = `select * from custom_order where id = ${req.params.orderId};`;
      
  
      const [result] = await connection.query(sqlGetOrder );
     
      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      next(error)
    }
  };


  const getCustomOrderByUserIdRouter =  async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection()

    
  
      const sqlGetOrder = `select * from custom_order where user_id = ${req.params.userId};`;
      
  
      const [result] = await connection.query(sqlGetOrder );
      console.log(result);
      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      next(error)
    }
  };






router.get("/user/:userId", getCustomOrderByUserIdRouter)
  router.get("/:orderId", getCustomOrderByIdRouter )
router.get("/", getCustomOrderRouter )

module.exports = router;