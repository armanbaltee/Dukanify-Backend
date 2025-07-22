const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv').config();

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