import { MongoClient } from 'mongodb';
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI); // Connection URI
const clientPromise = client.connect(); // Connect to the MongoDB cluster

export default clientPromise;
