import express from "express";
import { addNote, updateNote, deleteNote, searchNote, paginatedNotes, sortNote } from "../controllers/noteControllers.js";
import { verifyAccessToken } from "../middleware/accessTokenVerification.js";
import Note from "../models/noteSchema.js";

const noteRoute = express.Router();

noteRoute.post("/addNote",verifyAccessToken, addNote);
noteRoute.put("/updateNote/:id", verifyAccessToken, updateNote);
noteRoute.delete("/deleteNote/:id", verifyAccessToken, deleteNote);
noteRoute.get("/searchNote", verifyAccessToken , searchNote);
noteRoute.get('/paginatedNote', verifyAccessToken , paginatedNotes );
noteRoute.get('/sortNote',verifyAccessToken , sortNote)

export default noteRoute;


