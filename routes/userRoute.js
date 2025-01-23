import express from "express";
import { addUser } from "../controllers/userControllers.js";
import { verifyToken } from "../emailVerify/mailVerify.js";

const route = express.Router();

route.post('/postData', addUser);
route.get("/verify/:token",verifyToken)


export default route;


