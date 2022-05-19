const router = require("express").Router();
const pool = require("../../config/database");

const postStocksRouter = async (req, res, next) => {

  const connection = await pool.promise().getConnection();

  try {

    const sqlPostStocks = "INSERT INTO stocks SET ?";

    const data = req.body;

    try {
      const result = await connection.query(sqlPostStocks, data);

      res.status(201).send({
        message: `Data Stock  berhasil ditambahkan`,
      });
    } catch (error) {
      connection.release();
      next(error);
    }
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.post("/", postStocksRouter);

module.exports = router;
