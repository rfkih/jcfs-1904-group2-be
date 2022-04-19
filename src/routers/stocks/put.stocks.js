const router = require("express").Router();
const pool = require("../../config/database");

const putUpdateStocksRouter = async (req, res, next) => {
 

    try {
        const connection = await pool.promise().getConnection()
        
        
        try {

            let stock = 0
            let newStock = 0
            if (req.body.isLiquid) {
                stock = req.body.prevStock.stockLiquid
                newStock = req.body.newCalculatedStock.stockLiquidNew
            } else {
                stock = req.body.prevStock.stockNonLiquid
                newStock = req.body.newCalculatedStock.stockNonLiquidNew
            }

            let writtenStock = 0

            
                writtenStock = Math.abs(newStock - stock)
           
            
            const sqlPostLog = "INSERT INTO data_logging SET ?"

            const dataLogIn = [{
                user_id: 1,
                product_id: req.body.params.id,
                stock_in: writtenStock,
                status: 'edit',
                }]

            const dataLogOut = [{
                    user_id: 1,
                    product_id: req.body.params.id,
                    stock_out: writtenStock,
                    status: 'edit',
                    }]

            if (newStock >= stock) {
                await connection.query(sqlPostLog, dataLogIn)
            }else{
                await connection.query(sqlPostLog, dataLogOut)
            }
             

            const sqlUpdateProduct = `UPDATE stocks SET ? WHERE product_id = ?`;

            const dataUpdateProduct = [req.body.updatedStocks, req.body.params.id]
            const result =  await connection.query(sqlUpdateProduct, dataUpdateProduct) 
           
            res.status(201).send({
                message: `Stock berhasil di update`,
                
            });
     
    } catch (error) {
        
        next(error);
    }
  } catch (error) {
    connection.rollback();
    next(error);
  }
};

router.put("/:productsId", putUpdateStocksRouter);

module.exports = router;
