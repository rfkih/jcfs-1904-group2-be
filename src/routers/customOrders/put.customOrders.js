const router = require("express").Router();
const {mysql2} = require("../../config/database");




const putIsApprovedRouter =  async (req, res, next) => {

    try {
        const connection = await mysql2.promise().getConnection()

        console.log(req);

        const sqlUpdateProduct = `UPDATE products SET ? WHERE id = ?`;
        
        
        const dataUpdateProduct = [req.body.updatedProduct, req.body.params.id]
        try {
           const result =  await connection.query(sqlUpdateProduct, dataUpdateProduct) 
           
            res.status(201).send({
                message: `Produk berhasil di update`,
                
            });

        } catch (error) {
            next(error)
        } 
    } catch (error) {
        next(error);
    }
};



router.put("/", putIsApprovedRouter)