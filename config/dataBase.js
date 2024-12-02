import { connect } from "mongoose";

const mongo_uri=process.env.MONGO_URI;

export const connectdb=async()=>{

    try {
        const response =await connect(mongo_uri);
        console.log("db connected successfully");
        
    } catch (error) {
        
        console.log(error);
        
    }
}