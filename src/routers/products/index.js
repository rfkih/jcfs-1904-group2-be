const express = require("express");
const router = express.Router();

const getProductRouter = require("./get.products")

router.use(getProductRouter)


module.exports = router;