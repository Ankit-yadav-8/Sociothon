import mongoose from 'mongoose';

const uri = 'mongodb+srv://ankityadav08022008_db_user:XzdzmSqkOomiGQ9D@cluster0.z9eb8ev.mongodb.net/loopiit?retryWrites=true&w=majority';

console.log('Testing connection to MongoDB Atlas cluster0.z9eb8ev.mongodb.net...');

async function testConnection() {
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log('SUCCESS: Successfully connected to MongoDB Atlas!');
    console.log('Database name:', conn.connection.name);
    console.log('Host:', conn.connection.host);
    await mongoose.disconnect();
    console.log('Disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('CONNECTION FAILED:', err.message);
    process.exit(1);
  }
}

testConnection();
