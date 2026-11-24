import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firebaseUid: {
        type:String,
        required:true,
        unique:true
    },
    name: {
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    photoUrl: {
        type:String,
        default:"https://img.icons8.com/?size=100&id=83190&format=png&color=000000"
    }
},{timestamps:true})
const User = mongoose.model("User", userSchema);
export default User;