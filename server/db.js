import mongoose from "mongoose";
import {config} from "dotenv"
config({path:".env"})
export const connectDb=()=>{
    mongoose.connect(process.env.MongoDbUrl,{
        dbName:"e-comm-store"
    }).then(()=>console.log("Database is connected.."))
}


