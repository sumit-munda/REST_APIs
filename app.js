
// Setting up a simple server using Express.js

require("dotenv").config();
const express = require("express"); // importing the express module
const connectDB = require("./db/connect");
const app = express(); // defines routes and handles HTTP requests.

const PORT = process.env.PORT || 5000; // PORT on which the server will listen

const product_routes = require("./routes/products");

app.get("/", (req, res) => {
  // GET route handler / when get request is made to root url, the server responds
  res.send("Hi, I am LIVE!"); // once got router below
});

// middleware or to set router

app.use("/api/products", product_routes);

const start = async () => {
  // func to start the server
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      // start the server
      console.log(`${PORT} Yes I am connected to Express Server! and DB`);
    });
  } catch (error) {
    console.log(error + "DB");
  }
};

start();
