const router = require("express").Router();
const pool = require("../../config/database");
const connection = await pool.promise().getConnection();

//Get Categories

const getCategoriesRouter = async (req, res, next) => {
  try {
    const sqlGetCategories = "select id, categoryName from category";

    const [result] = await connection.query(sqlGetCategories);
    connection.release();

    res.status(200).send(result);
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.get("/", getCategoriesRouter);

module.exports = router;
