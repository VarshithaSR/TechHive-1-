// index.js
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/item");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      () => console.log("connect successfully"),
      (error) => console.log(error)
    );
};
dbConnect();

app.use("/api/items", itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
