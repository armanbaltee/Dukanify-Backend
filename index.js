const userRoutes = require("./routes/user.routes")
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/signup/signup.routes')


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', otpRoutes);
app.use(routes);
app.use(errorHandler);
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




