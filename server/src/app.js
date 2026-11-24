import express from "express";
import {config} from "dotenv";
import connectToDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.route.js";
import cors from "cors"
config();
const app = express();
const PORT = process.env.PORT || 5000
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use("/api/auth",auth);
connectToDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server started on http://localhost:5000");
})
}).catch((error)=>{
    console.error(error.message);
    process.exit(1);
})