const express = require("express");
const router = express.Router();

const getUserRouter = require("./get.user")

router.use(getUserRouter)


module.exports = router;