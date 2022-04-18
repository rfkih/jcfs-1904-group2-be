const router = require("express").Router();
const {mysql2} = require("../../config/database");


// Get All User
const getUserRouterAdmin =  async (req, res, next) => {
    try {
      const connection = await mysql2.promise().getConnection()
      console.log(req.query.pages);
  
      const sqlGetAllUser = `select id, username, name, gender, email, password, role from users where role = "user" ${req.query.keywordUser} ${req.query.sortUser} ${req.query.pages};`;
      const sqlCountUser = `SELECT COUNT(*) AS user_count FROM users where role = "user";`;
  
      const [result] = await connection.query(sqlGetAllUser);
      const [userCount] = await connection.query(sqlCountUser)
      connection.release();
  
      res.status(200).send({result, userCount});
    } catch (error) {
      next(error)
    }
  };


  const getUserbyIdRouterAdmin =  async (req, res, next) => {
    try {
      const connection = await mysql2.promise().getConnection()

      console.log();
  
      const sqlGetUserById = `select id, username, name, gender, photo, email, password, role from users where id = ${req.params.UserId};`;

      const sqlGetTransactionByUserId = `select id, invoice, user_id, transactionStatus, totalPrice, created_at from transaction where user_id = ? ${req.query.pages}`;
      const sqlCountTransaction = `SELECT COUNT(*) AS count FROM transaction where user_id = ?;`
      const [result] = await connection.query(sqlGetUserById);
      const [count] = await connection.query(sqlCountTransaction, result[0].id)
      const [transaction] = await connection.query(sqlGetTransactionByUserId, result[0].id)
      
      
      connection.release();
  
      res.status(200).send({result, transaction, count});
    } catch (error) {
      next(error)
    }
  };

  router.get("/admin/:UserId", getUserbyIdRouterAdmin)
  router.get("/admin", getUserRouterAdmin)

  module.exports = router;