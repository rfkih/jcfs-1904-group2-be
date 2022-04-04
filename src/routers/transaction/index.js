const express = require("express");
const router = express.Router();


const getTransactionRouter = require("./get.transaction")
const getCompletedTransactionRouter = require("./get.transaction")
const getCompletedTransaction7dayRouter = require("./get.transaction")
const getCompletedTransactiontodayRouter = require("./get.transaction")


router.use(getTransactionRouter)
router.use(getCompletedTransactiontodayRouter)


module.exports = router;