const express = require("express");
const router = express.Router();

const getProductRouter = require("./get.products")
const postProductRouter = require("./post.products")

router.use(getProductRouter)
router.use(postProductRouter)

module.exports = router;