const router = require("express").Router();
const pool = require("../../config/database");




const putAddressRouter =  async (req, res, next) => {  
    try {
        const connection = await pool.promise().getConnection();
       
        const sqlInputAddress = `UPDATE transaction SET address_id = ${req.body.firstAddress.id} where id = ${req.params.transactionId}`;

        const [result] = await connection.query(sqlInputAddress);
        connection.release();
        res.status(200).send(result);
         
    } catch (error) {
      next(error)
    }
};



const putTransactionStatusRouter =  async (req, res, next) => {  
  try {
      const connection = await pool.promise().getConnection();
     
      const sqlInputAddress = `UPDATE transaction SET transactionStatus = '${req.body.params.status}' where id = ${req.params.transactionId}`;

      const [result] = await connection.query(sqlInputAddress);
      connection.release();
      res.status(200).send(result);
       
  } catch (error) {
    next(error)
  }
};


const putTransactionSendRouter =  async (req, res, next) => {  
  try {
      const connection = await pool.promise().getConnection();
      const sqlGetTransactionDetail = ` select * from transactiondetail where transaction_id = ${req.params.transactionId} `
      const sqlInputAddress = `UPDATE transaction SET transactionStatus = '${req.body.params.status}' where id = ${req.params.transactionId}`;

      const [detail] = await connection.query(sqlGetTransactionDetail)
      const [result] = await connection.query(sqlInputAddress);
    
      detail.forEach( async(item) => {
        // console.log(item)
        const sqlUpdateLog = `UPDATE data_logging SET ? WHERE id = ${item.log_id}`
        const sqlGetStocks = `select * from stocks WHERE product_id = ${item.product_id};`
        const sqlUpdateStocks = `UPDATE stocks SET ? WHERE product_id = ${item.product_id}`;

            const dataBought = [{
                stock_out: item.quantity,
                progress: 0,
                status: 'bought',
                }]
            
            try {
              const [log] = await connection.query(sqlUpdateLog, dataBought)
              const [stock] = await connection.query(sqlGetStocks);

              const {qtyBoxAvailable, qtyBoxTotal, qtyBottleAvailable, qtyBottleTotal, qtyMlAvailable, qtyMlTotal, qtyStripsavailable, qtyStripsTotal, qtyMgAvailable, qtyMgTotal } = stock[0]
              
              let calculatedStock = 0
                if (item.isLiquid) {
                   calculatedStock = qtyBottleTotal + (qtyBoxTotal * 10)  
                }else{
                  calculatedStock = qtyStripsTotal + (qtyBoxTotal * 10)
                }

                calculatedStock =  (calculatedStock - item.quantity)

                if (calculatedStock >= 0) {
                  try {

                    var box = (Math.floor(calculatedStock / 10))
                    var qty = (calculatedStock - (box * 10))

                    if (item.isLiquid) {
                      stockData = [ 
                        {
                          qtyBoxTotal: box,
                          qtyBottleTotal: qty
                        }
                      ]

                     const [stock] = await connection.query(sqlUpdateStocks, stockData)
                     console.log(stock);
                      
                    } else {
                      stockData = [ 
                        {
                          qtyBoxTotal: box,
                          qtyStripsTotal: qty
                        }
                      ]  
                      const [stock] = await connection.query(sqlUpdateStocks, stockData)  
                        console.log(stock);
                    }
                    
                  } catch (error) {
                    
                  }
                  
                } else {
                  
                }

            } catch (error) {
              
            }
      })

     
     
      connection.release();
      res.status(200).send();
       
  } catch (error) {
    next(error)
  }
};

router.put("/send/:transactionId", putTransactionSendRouter)
router.put("/status/:transactionId", putTransactionStatusRouter)
router.put("/:transactionId", putAddressRouter)

module.exports = router;