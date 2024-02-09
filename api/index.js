const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const Transaction = require("./models/Transaction.js");
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(express.json());
app.get("/api/test", (req, res) => {
  res.json("test ok3");
});

app.post("/api/transaction", async (req, res) => {
  try {
    console.log("Connecting to MongoDB database...");
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB database connected successfully!");

    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.datetime ||
      !req.body.price
    ) {
      res.status(400).send("Missing required fields");
      return;
    }
    const { name, description, datetime, price } = req.body;
    const transaction = await Transaction.create({
      name,
      description,
      datetime,
      price,
    });
    res.json(transaction);
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(4040);
