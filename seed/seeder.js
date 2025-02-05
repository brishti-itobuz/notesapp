import express from 'express';

import { connectToDb } from "../config/dbConnection.js";
import Note from "../models/noteSchema.js";
import userSchema from "../models/userSchema.js";
import session from "../models/sessionSchema.js";
import generateNotes from '../seed/noteSeeder.js';
import generateUsers from '../seed/userSeeder.js';
import mongoose from 'mongoose';


async function reset () {
    connectToDb()
    await Note.deleteMany();
    await userSchema.deleteMany();
    await session.deleteMany();
    console.log('Database is reset');
}

async function createSeeder() {
    await generateUsers(100)
    await generateNotes(100)
   mongoose.connection.close()
}

await reset()
createSeeder()
