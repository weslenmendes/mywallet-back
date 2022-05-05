import { MongoClient } from "mongodb";

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri);
let db = null;

async function connectWithDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("Database successfully connected!");
  } catch (e) {
    await client.close();
    console.error("There was an error connecting to the database:", e);
  }
}

export { connectWithDB, db };
