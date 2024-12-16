import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { getRandomName, getRandomThoughts } from './data.js';

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck?.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
  if (userCheck?.length) {
    await connection.dropCollection('users');
  }

  const users = [];
  const numOfUsersToMake = 20;

  for (let i = 0; i < numOfUsersToMake; i++) {
    const username = getRandomName();
    const splitName = username.split(" ");
    users.push({
      username,
      email: splitName[0] + i + splitName[1] + "@email.com",
    });
  }

  const dbUsers = await User.insertMany(users);
  
  
  
  for(let nextUserIndex in dbUsers){
    
    const newUserThoughts = getRandomThoughts(Math.floor(Math.random() * 5), dbUsers[nextUserIndex].username);
    
    const arrDBThoughts = await Thought.insertMany(newUserThoughts);
    
    await User.findByIdAndUpdate(dbUsers[nextUserIndex]._id, { thoughts: (arrDBThoughts.map((nextThoughtElement) => nextThoughtElement._id))});
  }

  
  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
