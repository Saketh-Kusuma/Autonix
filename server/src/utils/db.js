import mongoose from "mongoose";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
const connectToDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_DB_URL.toString() || "");
    console.log("MongoDB Connected");
  } 
  catch(error)
  {
    throw new Error(error.message);
}
}
export default connectToDB;