import multer from "multer";
import path from "path";
import Note from "../models/noteSchema.js";

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

export const uploadStorage = multer({
    storage: storage,
});

export const uploadFile = async (req, res) => {
try {
    const id = req.params.id
if (!req.file) 
         return res.status(400).send({
            success: false,
            message: "file not uploaded"
        });

        const note = await Note.findById(id);  
        note.fileName = req.file.filename;
        await note.save();
        res.status(200).send({
            success: true,
            message: `file is uploaded successfully: ${req.file.filename}`,
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "cannot attach file"
        })
    }

}

