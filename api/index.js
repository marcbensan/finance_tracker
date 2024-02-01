const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const Transaction = require("./models/transaction");
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(express.json());
app.get("/api/test", (req, res) => {
  res.json("test ok3");
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL)
  const { name, description, datetime, price } = req.body;
  const transaction = await Transaction.create({name, description, datetime, price})

  res.json(transaction);
});

app.listen(4040);
// wemy9cqCvDjgET2E
//vdRipY4VW0n3ymzL
