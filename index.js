require("dotenv").config();

const express=require('express');
const mongoose=require('mongoose');


const authRouter=require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

const app=express();
const port=process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

mongoose.connect(process.env.URI).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log(e);
})
app.listen(port,"0.0.0.0",()=>{
    console.log(`connected at port ${port} `);
})

