const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const errorHandler = require('./middlewares/errorHandler');



const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Dukanify')
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Database connected");
        console.log(`Server running at: http://localhost:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(`Error is: ${err.message}`)
})


app.use('/api/auth', authRoutes);
app.use('/api', otpRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});