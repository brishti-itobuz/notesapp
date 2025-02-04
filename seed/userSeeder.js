import { faker } from '@faker-js/faker';
import userSchema from '../models/userSchema.js';
import bcrypt from 'bcrypt';

const generateUsers = async (num) => {
  const users = [];

  for (let i = 1; i <= num; i++) {
    const userName = faker.internet.username();
    let password = "thisispass";
    const salt = await bcrypt.genSalt(10);
    
    const email = `brishti+${i}@itobuz.com`;
    const isVerified = true;

    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword

    users.push({userName,password,email,isVerified});
  }
  try{
     await userSchema.insertMany(users)
     console.log(`${num} users are created`)
  }
  catch(error){
     console.log(error)
  }
};

export default generateUsers