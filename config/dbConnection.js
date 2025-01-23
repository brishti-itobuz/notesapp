
import mongoose from "mongoose";


const connectionString =
  "mongodb+srv://brishti:1234@brishti.mmfnj.mongodb.net/?retryWrites=true&w=majority&appName=brishti";

export async function connectToDb() {
  await mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Connected to MongoDB successfully!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}