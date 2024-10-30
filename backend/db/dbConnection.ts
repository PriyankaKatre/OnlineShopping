
import mongoose from "mongoose"
import express from "express"
import { DB_NAME } from "../constant"

const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        console.log('connected to mongoDB successfully .............')
    }
    catch (error) {
        console.log('MongoDb Connection Error', error);
        process.exit(1)
    }
}

export default connectDB
