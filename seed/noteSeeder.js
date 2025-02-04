import { faker } from '@faker-js/faker'
import userSchema from '../models/userSchema.js';
import Note from '../models/noteSchema.js';


const generateNotes = async (num) => {
  const notes = [];
  const users = await userSchema.find()
  for (let i = 1; i <= num; i++) {
    const title = faker.internet.username();
    const content = faker.internet.username();
    const userId = users[Math.floor(Math.random()*users.length)]._id

    notes.push({title,content,userId,});}
  try{
     await Note.insertMany(notes)
     console.log(`${num} notes are created`)
  }
  catch(error){
     console.log(error)
  }
};

export default generateNotes