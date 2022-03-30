const express = require("express");
const router = express.Router();

const getStocksRouter = require("./get.stocks")

router.use(getStocksRouter)

module.exports = router;