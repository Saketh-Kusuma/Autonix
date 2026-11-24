import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const verifyUser = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        if(!token)
        {
            return res.status(401).json({success:false,message:"Unauthorized"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user)
        {
            return res.status(404).json({success:false,message:"Invalid Credentials"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({success:false, message:`Middleware Error: ${error.message}`});
    }
}
export default verifyUser;