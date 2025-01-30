import express from "express";
import { addNote } from "../controllers/noteControllers.js";
import { verifyBearerAccessToken } from "../middleware/accessTokenVerification.js";
import Note from "../models/noteSchema.js";

const noteRoute = express.Router();

noteRoute.post("/addNote",verifyBearerAccessToken, addNote);

export default noteRoute;

