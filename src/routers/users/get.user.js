const router = require("express").Router();
const {mysql2} = require("../../config/database");


// Get All User
const getUserRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()

        console.log();
  
      const sqlGetAllUser = `select id, username, name, gender, email, password, role from users where role = "user" ${req.query.sortUser};`;
      const sqlCountUser = `SELECT COUNT(*) AS user_count FROM users where role = "user";`;
  
      const [result] = await connection.query(sqlGetAllUser);
      const [userCount] = await connection.query(sqlCountUser)
      connection.release();
  
      res.status(200).send({result, userCount});
    } catch (error) {
      next(error)
    }
  };


  const getUserbyIdRouter =  async (req, res, next) => {
    try {
      const connection = await mysql2.promise().getConnection()
  
      const sqlGetUserById = `select id, username, name, gender, photo, email, password, role from users where id = ?;`;

      const sqlGetTransactionByUserId = `select id, invoice, user_id, transactionStatus, totalPrice, created_at from transaction where user_id = ?`;
  
      const [result] = await connection.query(sqlGetUserById, req.params.UserId);

      
      const [transaction] = await connection.query(sqlGetTransactionByUserId, result[0].id)
      
      connection.release();
  
      res.status(200).send({result, transaction});
    } catch (error) {
      next(error)
    }
  };

  router.get("/:UserId", getUserbyIdRouter)
  router.get("/", getUserRouter)

  module.exports = router;