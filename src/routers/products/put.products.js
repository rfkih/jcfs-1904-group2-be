const router = require("express").Router();
const pool = require("../../config/database");

const putDeleteRouter =  async (req, res, next) => {

    const connection = await pool.promise().getConnection()

    try {
       

        const sqlDelete = `UPDATE products SET isDeleted = 1 WHERE id = ${req.body.id}`;

       

        try {
           const result =  await connection.query(sqlDelete) 
           
            res.status(201).send({
                message: `Produk berhasil di soft delete`,
                
            });
            connection.release();

        } catch (error) {
            connection.release();
            next(error)
        } 
    } catch (error) {
        connection.release();
        next(error);
    }
};

const putUndeleteRouter =  async (req, res, next) => {

    const connection = await pool.promise().getConnection()

    try {
       
        const sqlUndelete = `UPDATE products SET isDeleted = 0 WHERE id = ${req.body.id}`;
        
        try {
           const result =  await connection.query(sqlUndelete) 
           
            res.status(201).send({
                message: `Produk berhasil di un-delete`,
                
            });
            connection.release();

        } catch (error) {
            connection.release();
            next(error)
        } 
    } catch (error) {
        connection.release();
        next(error);
    }
};


const putUpdateProductRouter =  async (req, res, next) => {

    const connection = await pool.promise().getConnection()

    try {
       

        const sqlUpdateProduct = `UPDATE products SET ? WHERE id = ?`;
        
        
        const dataUpdateProduct = [req.body.updatedProduct, req.body.params.id]
        try {
           const result =  await connection.query(sqlUpdateProduct, dataUpdateProduct) 
           
            res.status(201).send({
                message: `Produk berhasil di update`,
                
            });
            connection.release();

        } catch (error) {
            connection.release();
            next(error)
        } 
    } catch (error) {
        connection.release();
        next(error);
    }
};


router.put("/undelete", putUndeleteRouter)
router.put("/:productsId", putUpdateProductRouter)
router.put("/", putDeleteRouter)


module.exports = router