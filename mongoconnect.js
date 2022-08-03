// import MongoClient from mongodb lib, out of the many other exports
const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb+srv://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    // seed the database

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
