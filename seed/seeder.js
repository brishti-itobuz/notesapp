import express from 'express';
import mongoose from 'mongoose';
import { connectToDb } from "./config/dbConnection.js";
import Note from "../models/noteSchema.js";
import userSchema from "../models/userSchema.js";
import sessionSchema from "../models/sessionSchema.js";
import generateNotes from '../seed/noteSeeder.js';
import generateUsers from '../seed/userSeeder.js';
import mongoose from 'mongoose';


async function reset () {
    connectDB();
    await Note.deleteMany();
    await userSchema.deleteMany();
    await sessionSchema.deleteMany();
    console.log('Database is reset');
}

async function createSeeder() {
   await generateNotes(100)
   await generateUsers(100)
   mongoose.connection.close()
}

await reset()
createSeeder()
