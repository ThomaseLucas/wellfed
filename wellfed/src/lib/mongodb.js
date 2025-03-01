import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env.local");
  }

console.log(" Connecting to MongoDB...");

let client;
let clientPromise

try {
    client = new MongoClient(process.env.MONGODB_URI); // Connection URI
    clientPromise = client.connect(); // Connect to the MongoDB cluster
    console.log("Connected to MongoDB!");

} catch (error) {
    console.error("MongoDB Connection Error:", error);
}


export default clientPromise;
