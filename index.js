const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv').config();
const routes = require('./routes/signup/signup.routes')

const session = require('express-session');;
const authRoutes = require('./routes/signup/auth.routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(routes);

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/Dukanify', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
