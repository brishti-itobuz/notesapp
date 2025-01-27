import mongoose from "mongoose";
import dotenv from "dotenv/config";



const db_URL = process.env.CONNECTION_STRING;
export async function connectToDb() {
  await mongoose
    .connect(db_URL)
    .then(() => {
      console.log("Connected to MongoDB successfully!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}

