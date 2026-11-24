import {getAuth} from "firebase-admin/auth"
import firebase from "../utils/firebase.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const login = async (req,res) => {
    try {
        const {fireBaseToken} = req.body;
        if(!fireBaseToken)
        {
            res.status(400).json({
                success:false,
                message:"Login failed no token found"
            });
        }
        const decoded = await getAuth(firebase).verifyIdToken(fireBaseToken);
        if(!decoded)
        {
             res.status(400).json({
                success:false,
                message:"Login failed - Try Again"
            });
        }
        const user = await User.findOneAndUpdate({firebaseUid:decoded.uid},
            {
                $set:{
                    name:decoded.name,
                    email:decoded.email,
                    photoUrl:decoded.picture
                },
                $setOnInsert:{
                    firebaseUid:decoded.uid
                }
            },
            {upsert:true,
                returnDocument:"after"
            }
        );
        const token = await jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"strict",maxAge:7*24*60*1000});
        return res.status(200).json({success:true,user:{
            id:user.id,
            name:user.name,
            photoUrl:user.photoUrl,
            email:user.email
        }});
    } catch (error) {
         return res.status(500).json({success:false, message:`Login Error: ${error.message}`});
    }
}

export const logout = async (req,res) => {
    try {
        res.clearCookie("token",{httpOnly:true,secure:false,sameSite:"strict",maxAge:7*24*60*1000});
        return res.status(200).json({success:true,message:"Logout Successful"})
    } catch (error) {
        return res.status(500).json(`Login Error: ${error.message}`);
    }
}

export const getMe = async (req,res) => {
    try {
        const {user} = req;
        if(!user)
        {
            return res.status(404).json({success:false, message:`User Not Found: ${error.message}`});
        }
        return res.status(200).json({success:true, user:{
            id:user.id,
            name:user.name,
            photoUrl:user.photoUrl,
            email:user.email
        }})
    } catch (error) {
        return res.status(500).json({success:false, message:`GetMe Error: ${error.message}`});
    }
}