import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./router/userRouter";
import productRouter from "./router/productRouter";
import orderRouter from "./router/orderRouter";
import paymentRouter from "./router/paymentRouter";
import multer from "multer";
import path from "path";
import connectDB from "./db/dbConnection";

const app: express.Application = express();

//configure cors
app.use(cors());

//configure dotENV
dotEnv.config({ path: "./.env" });

const port = process.env.PORT || 5000;

// Configure express to receive the from data
app.use(express.json())


//Basic URL for application
app.get('/', (request: express.Request, response:express.Response) => {
    response.send('Online shoping application Backend')
})

// Router configuration

app.use('/api/users', userRouter);
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/payments', paymentRouter)

//connect DB
connectDB().then(() => {
    app.on("error", (error) => {
        console.log("ERROR", error);
        throw error
    })

    app.listen(port, () => {
        console.log(`express server is starting at port ${port}`)
    })
}).catch((error) => {
    console.log('Mongo Db Connection failed', error)
})





