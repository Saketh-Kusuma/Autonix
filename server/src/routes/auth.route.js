import { Router } from "express";
import { getMe, login, logout } from "../controllers/auth.controller.js";
import verifyUser from "../middleware/auth.middleware.js";
const auth = Router();
auth.post("/login",login);
auth.post("/logout",logout);
auth.get("/me",verifyUser,getMe);
export default auth;