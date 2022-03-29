require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 2021;


const userRouter = require("./src/routers/users")
const productRouter = require ("./src/routers/products")
const categoriesRouter = require ("./src/routers/categories")

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

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