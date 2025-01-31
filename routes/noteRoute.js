import express from "express";
import { addNote } from "../controllers/noteControllers.js";
import { verifyAccessToken } from "../middleware/accessTokenVerification.js";
import Note from "../models/noteSchema.js";

const noteRoute = express.Router();

noteRoute.post("/addNote",verifyAccessToken, addNote);

export default noteRoute;

