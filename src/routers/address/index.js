const express = require("express");
const router = express.Router();




const getAddressRouter = require('./get.address')


router.use(getAddressRouter)

module.exports = router;