const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 7000;

mongoose
  .connect("mongodb://localhost:27017/Dukanify")
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database connection error: ${err.message}`);
  });


