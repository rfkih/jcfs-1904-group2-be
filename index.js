require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const app = express();
const path = require('path')
const port = 2021;

const stocksRouter = require("./src/routers/stocks")
const userRouter = require("./src/routers/users")
const productRouter = require ("./src/routers/products")
const categoriesRouter = require ("./src/routers/categories")
const transactionRouter = require ("./src/routers/transaction")
const transactiondetailRouter = require("./src/routers/transactionDetails")
const customordersRouter = require("./src/routers/customOrders/")

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



app.use("/transaction", transactionRouter)
app.use("/customorders", customordersRouter)
app.use("/transactiondetails", transactiondetailRouter)
app.use("/stocks", stocksRouter)
app.use("/categories", categoriesRouter)
app.use("/products", productRouter)
app.use("/users", userRouter);
app.get("/", (req, res) => {
  res.status(200).send("API IS RUNNING");
});

app.listen(port, (err) => {
  if (err) return cosole.log({ err });

  console.log(`Api is running at port ${port}`);
});