const router = require("express").Router();
const pool = require("../../config/database");


const getCartRouter =  async (req, res, next) => {
    try {

        const connection = await pool.promise().getConnection()
  
      const sqlGetCart = `select products.id as product_id, products.productIMG, products.productName, products.price, cart.id, cart.productQuantity, cart.user_id, cart.totalPrice, cart.isCustom, cart.isActive from products inner join cart on products.id=product_id where user_id = ${req.query.userId} and isActive = 1 ${req.query.custom}`
      const sqlCountCart = `SELECT COUNT(*) AS count FROM cart  where user_id = 21 and isActive = 1 and isCustom = 1`
     
      const [result] = await connection.query(sqlGetCart);
      const [count] = await connection.query(sqlCountCart)
      
      connection.release();
  
      res.status(200).send({result , count});
    } catch (error) {
      next(error)
    }
  };


  router.get("/", getCartRouter)
 
  module.exports = router;
