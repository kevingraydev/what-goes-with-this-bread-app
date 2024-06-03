const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" }); // Tells this to look at our config.env file for environmental variables.

let db = null;

async function connectToMongoDB() {
  const db_env = process.env.ATLAS_URI; // this is how we access environmental variables.
  const client = new MongoClient(db_env); // creates a new mongo client and uses username and password to login

  try {
    if (!db) {
      await client.connect();
      console.log("Connected to MongoDB"); // actually takes the client and password and creates are connection ot the database
      db = client.db("what-goes-with-this-bread"); // initially did not work due to t async // initially did not work b/c reference was collecdtions and not collection.
    }
    return db;

    // const collections = await client
    //   .db("what-goes-with-this-bread") // initially did not work due to type
    //   .collections(); // async // initially did not work b/c reference was collecdtions and not collection
    // // Print list of collections below
    // collections.forEach(
    //   (
    //     collection // initially referenced an error that .forEach was not correct but that was because of the above errors.
    //   ) => console.log(collection.s.namespace.collection) // in order to get this to execute in the terminal we call "node connect.cjs"
    //   // What shoulld be returned are the collections in the database, in this case Users, Ingredients, and Queries, which mates what's online.
    // );
  } catch (e) {
    console.error("Error connecting to MongoDB", e); // logs any error that might happen
    // } finally {
    //   await client.close(); // closes our db connection
    // }
  }
}

module.exports = connectToMongoDB;
