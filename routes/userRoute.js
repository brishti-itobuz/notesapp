import express from "express";
import { addUser, loginUser } from "../controllers/userControllers.js";
import { verifyToken } from "../middleware/tokenVerification.js";
import { userValidator, userSchema } from "../validators/userValidation.js";
// import {verifyAccessToken} from "../middleware/accessTokenVerification.js";
import { regenerateAccessToken } from "../controllers/userControllers.js";

const route = express.Router();

route.post("/addUser", userValidator(userSchema), addUser);
route.get("/verify/:token", verifyToken);
route.post("/loginUser", loginUser);
route.get("/regenerateAccessToken", regenerateAccessToken );

export default route;
