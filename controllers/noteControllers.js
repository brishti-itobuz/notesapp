import Note from "../models/noteSchema.js";

export const addNote = async (req, res) => {
    const { title, content } = req.body;
    try {
      const newNote = await Note.create({ title, content });
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      console.error("Error adding note:", error);
      res.status(500).send(error);
    }
  };
  