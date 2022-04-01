const express = require("express");
const router = express.Router();

const getProductRouter = require("./get.products")
const postProductRouter = require("./post.products")
const putDeleteRouter = require("./put.products")

router.use(putDeleteRouter)
router.use(getProductRouter)
router.use(postProductRouter)

module.exports = router;