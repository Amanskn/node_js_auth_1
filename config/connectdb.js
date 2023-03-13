import mongoose from "mongoose";

const connectDB = async (DATABASE_URL)=>{
    try {
        const DB_OPTIONS={
            dbName:'Node_Auth_DB'
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("Connected successfully to the database");
        
    } catch (error) {
        console.log("Error in connecting to the database",error);
    }
}

// module.exports = connectDB;
export default connectDB;