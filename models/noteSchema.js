import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const Note = mongoose.model("note", noteSchema);
export default Note;
