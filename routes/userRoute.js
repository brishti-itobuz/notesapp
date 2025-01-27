import express from "express";
import { addUser, loginUser } from "../controllers/userControllers.js";
import { verifyToken } from "../middleware/tokenVerification.js";
import { userValidator, userSchema } from "../validators/userValidation.js";

const route = express.Router();

route.post("/addUser", userValidator(userSchema), addUser);
route.get("/verify/:token", verifyToken);
route.post("/loginUser", loginUser);

export default route;
