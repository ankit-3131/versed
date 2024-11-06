const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_LINK);
        console.log(`database connected: ${conn.connection.host}`)
    }
    catch(error){
        console.log(error);
    }
}
module.exports = connectDB;