const router = require("express").Router();
const pool = require("../../config/database");



const postTransactionRouter = async (req, res, next) => {

    try {
      const connection = await pool.promise().getConnection();
  
      await connection.beginTransaction();
      
      try {
        const sqlPostTransaction = "INSERT INTO transaction SET ?";
        
        const dataTransaction = [
          {
            invoice:"INV/" + Date.now(),
            user_id: req.body.userId,
            transactionStatus: 'waiting',
            totalPrice: req.body.subTotal,
            isByPresciption: 1,
          },
        ];
        
        
        const [result] = await connection.query(sqlPostTransaction, dataTransaction);
        

        req.body.cart.forEach( async (item)=>{
                console.log(item);
            const sqlPostTransactionDetail = "INSERT INTO transactiondetail SET ?";
            
            try {
                transactionDetailData = [
                    {
                        transaction_id: result.insertId,
                        product_id: item.product_id,
                        productCategory: item.category_id,
                        productName: item.productName,
                        productDescription: item.productDetails,
                        productImg: item.productIMG,
                        price: item.price,
                        quantity: item.productQuantity,
                        totalPrice: item.totalPrice,
                        statusTransactiondetail: 'waiting',
                    }
                ]

                const [detail] = await connection.query(sqlPostTransactionDetail, transactionDetailData);
                
            } catch (error) {
                next(error);
            }

            
        });

        try {

            const deleteCartSql = `DELETE FROM cart WHERE user_id = ${req.body.userId} and isActive = 1`;
            const [result] = await connection.query(deleteCartSql)
            
        } catch (error) {
            next(error);
        }

  
  
        connection.commit();
        res.send("input transaction success");
      } catch (error) {
        connection.rollback();
        next(error);
      }
    } catch (error) {
      next(error);
    }
  };



  router.post("/", postTransactionRouter);

module.exports = router;
