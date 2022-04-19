const router = require("express").Router();
const {mysql2} = require("../../config/database");




const getStocksRouter =  async (req, res, next) => {
    try {
        const connection = await mysql2.promise().getConnection()
  
      const sqlGetStocks = "select * from stocks WHERE product_id = ?";
     
      const [result] = await connection.query(sqlGetStocks, req.params.productsId);
      connection.release();

      const {qtyBoxAvailable, qtyBoxTotal, qtyBottleAvailable, qtyBottleTotal, qtyMlAvailable, qtyMlTotal, qtyStripsavailable, qtyStripsTotal, qtyMgAvailable, qtyMgTotal } = result[0]

      const stockLiquid = qtyBottleAvailable + (qtyBoxAvailable * 10)
      const stockNonLiquid = qtyStripsavailable + (qtyBoxAvailable * 10)

      calculatedStock = {stockLiquid, stockNonLiquid}

      res.status(200).send({calculatedStock, result});
    } catch (error) {
      next(error)
    }
  };

// GEt stock detail by id


const getStocksDetailRouter =  async (req, res, next) => {
  try {
      const connection = await mysql2.promise().getConnection()

    
    const sqlGetStocks = "select * from stocks WHERE product_id = ?";

    const sqlGetLog = `select * from data_logging where product_id = ${req.params.productsId} ${req.query.date} ${req.query.sort}`

    const sqlGetLogDetail = `select sum(stock_in) as total_stock_in, sum(stock_out) as total_stock_out from data_logging where product_id = ${req.params.productsId} ${req.query.date}`

    const sqlLogDetailBought = `select sum(stock_in) as total_add, sum(stock_out) as total_bought from data_logging where status = 'bought' or status = 'add' and product_id = ${req.params.productsId} ${req.query.date}`


    const [detail] = await connection.query(sqlGetLogDetail)
    const [bought] = await connection.query(sqlLogDetailBought)
    const [data] = await connection.query(sqlGetLog)
    const [result] = await connection.query(sqlGetStocks, req.params.productsId);

    connection.release();

    const {qtyBoxAvailable, qtyBoxTotal, qtyBottleAvailable, qtyBottleTotal, qtyMlAvailable, qtyMlTotal, qtyStripsavailable, qtyStripsTotal, qtyMgAvailable, qtyMgTotal } = result[0]

    const stockLiquid = qtyBottleAvailable + (qtyBoxAvailable * 10)
    const stockNonLiquid = qtyStripsavailable + (qtyBoxAvailable * 10)

    calculatedStock = {stockLiquid, stockNonLiquid}

    res.status(200).send({calculatedStock, result, data, detail, bought});
  } catch (error) {
    next(error)
  }
};


  
  router.get("/detail/:productsId", getStocksDetailRouter)
  router.get("/:productsId", getStocksRouter, )

  module.exports = router;