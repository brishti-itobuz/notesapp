import Note from "../models/noteSchema.js";

export const addNote = async (req, res) => {
    
    try {
      const userId = req.body.userId;
      console.log("add",userId);
      
      const { title, content} = req.body;
      const newNote = await Note.create({ title, content,userId});
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      console.error("Error adding note:", error);
      res.status(500).send(error);
    }
  };
  