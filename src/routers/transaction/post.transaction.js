const router = require("express").Router();
const pool = require("../../config/database");



const postTransactionRouter = async (req, res, next) => {

    try {
      const connection = await pool.promise().getConnection();
  
      await connection.beginTransaction();
      
      try {
        const sqlPostTransaction = "INSERT INTO transaction SET ?";
        console.log(req.body.userId);
        
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

  
        // const dataStock = [
        //   {
        //     product_id: result.insertId,
        //     qtyBoxAvailable: req.body.newStock.qtyBoxAvailable,
        //     qtyBoxTotal: req.body.newStock.qtyBoxTotal,
        //     qtyBottleAvailable: req.body.newStock.qtyBottleAvailable,
        //     qtyBottleTotal: req.body.newStock.qtyBottleTotal,
        //     qtyMlAvailable: req.body.newStock.qtyMlAvailable,
        //     qtyMlTotal: req.body.newStock.qtyMlTotal,
        //     qtyStripsavailable: req.body.newStock.qtyStripsavailable,
        //     qtyStripsTotal: req.body.newStock.qtyStripsTotal,
        //     qtyMgAvailable: req.body.newStock.qtyMgAvailable,
        //     qtyMgTotal: req.body.newStock.qtyMgTotal,
        //   },
        // ];
  
        // const stockLiquid =
        //   parseInt(req.body.newStock.qtyBottleAvailable) +
        //   parseInt(req.body.newStock.qtyBoxAvailable * 10);
        // const stockNonLiquid =
        //   parseInt(req.body.newStock.qtyStripsavailable) +
        //   parseInt(req.body.newStock.qtyBoxAvailable * 10);
  
        // const sqlPostLog = "INSERT INTO data_logging SET ?";
        // const dataLogLiquid = [
        //   {
        //     user_id: `${req.body.userId}`,
        //     username: `${req.body.username}`,
        //     product_id: result.insertId,
        //     stock_in: stockLiquid,
        //     status: "add",
        //   },
        // ];
  
        // const dataLoqNonLiquid = [
        //   {
        //     user_id: `${req.body.data}`,
        //     username: `${req.body.username}`,
        //     product_id: result.insertId,
        //     stock_in: stockNonLiquid,
        //     status: "add",
        //   },
        // ];
  
        
        // if (req.body.newProduct.isLiquid) {
        //   await connection.query(sqlPostLog, dataLogLiquid);
        // } else {
        //   await connection.query(sqlPostLog, dataLoqNonLiquid);
        // }
  
        // await connection.query(sqlPostStocks, dataStock);
  
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
