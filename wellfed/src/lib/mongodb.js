import { MongoClient } from "mongodb";


let client;
let clientPromise;

try {
  client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  clientPromise = client.connect()

} catch (error) {
  console.error("CRITICAL ERROR: Failed to create MongoClient:", error);
  clientPromise = Promise.resolve(null);
}

export default clientPromise;
