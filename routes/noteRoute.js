import express from "express";
import { addNote } from "../controllers/noteControllers.js";
import Note from "../models/noteSchema.js";

const noteRoute = express.Router();

noteRoute.post("/addNote", addNote);

export default noteRoute;

