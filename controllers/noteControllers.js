import Note from "../models/noteSchema.js";
import User from "../models/userSchema.js";

export const addNote = async (req, res) => {
    
    try {
      const userId = req.body.userId;
      
      const { title, content} = req.body;
      const existingNote = await  Note.findOne({ userId, title });
      if (existingNote) {
      return res.status(400).json({
        success: false,
        message: " Title already exists",
      });}
      const newNote = await Note.create({ title, content,userId});
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      console.error("Error adding note:", error);
      res.status(500).send(error);
    }
  }; 

  export const updateNote = async (req, res) => {
    
    try {
      const userId = req.body.userId;
      const id = req.params.id;
      const { title, content} = req.body;
      console.log("xdex", id);
      

      const existingNote = await Note.findOne({ userId, title });
      if (existingNote) {
      return res.status(400).json({
        success: false,
        message: " Title already exists",
      });}

    const note = await Note.findById(id);
    const user = note.userId;
    const  existingUser = await User.findById(user);

    const updatedNotes = await Note.findByIdAndUpdate({ _id: id },{ title, content });
    res.status(200).json({
      success: true,
      message: "Note updated",
      data: updatedNotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const findNote = await Note.findById(id);
    if (!findNote) {
      return res.status(404).json({
        success: false,
        message: "note is deleted earlier",
      });
    }

    const user = findNote.userId;
    const  existingUser = await User.findById(user);

    const deleteNote = await  Note.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "note has been deleted",
      deleteNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

 export const searchNote = async (req, res) => {
  try {
    const id = req.params.id;
    const searchNotes = await Note.findOne({ userId: req.userId, _id: id })
    if (searchNotes) {
      res.status(200).json({
        success: true,
        message: "note is fetched successfully",
        data: [{ id: searchNotes._id, title: searchNotes.title, content: searchNotes.content}]
      })
    }
  
  else {
    res.status(200).json({
      success: false,
      message: "No such note exists",
    })
  }
}
catch (error) {
  res.status(500).json({
    success: false,
    message: error,
  })
}
}


export const sortNote = async (req, res) => {
    try {
      const userId = req.body.userId;
      const sortCriteria = {
        [req.query.sortField]: req.query.sortOrder === "asc" ? 1 : -1,
      };
      const sortedDocuments = await Note.find({ userId }).sort(sortCriteria);
      return res.status(200).json({
        success: true,
        sortedDocuments,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

export const paginatedNotes = async (req, res) => {
  try {
    const { limit, page } = req.body
    const offset = (page - 1) * limit;
    const notes = await Note.find()
      .skip(offset)
      .limit(limit);

    res.status(200).json({
      totalResults: notes.length,
      output: notes.map(note => ({
        NoteId: note._id,
        title: note.title,
        content: note.content
      }))
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
}

  
  










      
      
      
    