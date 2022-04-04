const router = require("express").Router();
const {mysql2} = require("../../config/database");


// Get All User
const getUserRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetAllUser = "select id, username, gender, email, password, role from users;";
      const sqlCountUser = `SELECT COUNT(*) AS user_count FROM users where role = "user";`;
  
      const [result] = await connection.query(sqlGetAllUser);
      const [userCount] = await connection.query(sqlCountUser)
      connection.release();
  
      res.status(200).send({result, userCount});
    } catch (error) {
      next(error)
    }
  };

  router.get("/", getUserRouter)

  module.exports = router;