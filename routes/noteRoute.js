import express from "express";
import { addNote, updateNote, deleteNote, searchNote, paginatedNotes, sortNote } from "../controllers/noteControllers.js";
import { verifyAccessToken } from "../middleware/accessTokenVerification.js";
import { uploadStorage, uploadFile } from "../controllers/multer.js";
import { noteValidator, noteSchema } from "../validators/noteValidation.js";

const noteRoute = express.Router();

noteRoute.post("/addNote",verifyAccessToken,noteValidator(noteSchema),addNote);
noteRoute.put("/updateNote/:id", verifyAccessToken, updateNote);
noteRoute.delete("/deleteNote/:id", verifyAccessToken, deleteNote);
noteRoute.get("/searchNote/:id", verifyAccessToken , searchNote);
noteRoute.get('/paginatedNote', verifyAccessToken , paginatedNotes );
noteRoute.get('/sortNote',verifyAccessToken , sortNote);
noteRoute.post("/upload/:id", uploadStorage.single("fileName"), uploadFile);


export default noteRoute;


