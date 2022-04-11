const express = require("express");
const router = express.Router();

const getCustomOrderRouter = require("./get.customorders")
const putCustomOrderRouter = require("./put.customorders")




router.use(getCustomOrderRouter)
router.use(putCustomOrderRouter)

module.exports = router;