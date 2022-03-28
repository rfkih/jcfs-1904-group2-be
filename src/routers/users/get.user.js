const router = require("express").Router();
const {mysql2} = require("../../config/database");

const getUserRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetAllUser = "select id, username, gender, email, password, role from users;";
  
     
      const [result] = await connection.query(sqlGetAllUser);
      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      next(error)
    }
  };

  router.get("/", getUserRouter)

  module.exports = router;