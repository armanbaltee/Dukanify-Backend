const userRoutes = require("./routes/user.routes");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const routes = require('./routes/signup/signup.routes')

const session = require('express-session');;
const authRoutes = require('./routes/signup/auth.routes');
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/signup/signup.routes');
const session = require('express-session');
const authRouter = require('./routes/auth.routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Register routes (make sure there are no conflicting paths)
app.use("/api/auth", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", authRouter);
app.use("/api", otpRoutes);
app.use(routes);

app.use(errorHandler);

const PORT = process.env.PORT || 7000;

mongoose.connect('mongodb://localhost:27017/Dukanify', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
