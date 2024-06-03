const cookieSession = require("cookie-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const express = require("express");
const cors = require("cors");
const app = express();
const connectToMongoDB = require("./connect.cjs");
let db;

app.use(express.json());
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const authenticateUser = async (email, password, done) => {
  try {
    db = await connectToMongoDB();
    const Users = db.collection("Users");
    const query = { email: { $eq: email } };

    const user = await Users.findOne(query);
    if (!user) {
      return done(null, false, { message: "No user with that email" });
    }

    if (user.password === password) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (error) {
    return done(error);
  }
};

passport.use(
  new LocalStrategy({ usernameField: "email" }),
  await authenticateUser
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// passport.use(
//   new LocalStrategy(async function (email, password, profile, done) {
//     console.log(email, password);
//     try {
//       console.log("Level two");
//       db = await connectToMongoDB();
//       const Users = db.collection("Users");
//       const query = { email: { $eq: email }, password: { $eq: password } };

//       const user = await Users.findOne(query);
//       if (!user) {
//         return done(null, false, { message: "Incorrect email or password" });
//       }
//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   })
// );

// app.post(
//   "/login",
//   await passport.authenticate("local", { failureRedirect: "/profile" }),
//   async (req, res) => {
//     res.status(200).json({ validLogin: true });
//   }
// );

app.post("/login", async (req, res, next) => {
  try {
    passport.authenticate("local", async (err, user, info) => {
      try {
        if (err) {
          throw err;
        }
        if (!user) {
          console.log("no user");
          return res.status(200).json({ validLogin: false });
        }
        req.logIn(user, async (err) => {
          try {
            if (err) {
              throw err;
            }
            return res.status(200).json({ validLogin: true });
          } catch (err) {
            return res.status(500).json({ error: err.message });
          }
        });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    })(req, res, next);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// async (req, res) => {
//   try {
//     const validPassword = "password123";
//     let password = req.body.password;
//     console.log(password);
//     // Access the password from the database with information int he body of the message
//     if (password === validPassword) {
//       res.status(200).json({ validLogin: true });
//     } else {
//       res.status(200).json({ validLogin: false });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.body });
//   }
// }

// Route to get users
app.get("/api", async (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

// Route to put users into the database
app.post("/signup", async (req, res) => {
  const userStatuses = ["user created", "user already exists"];
  try {
    const email = req.body.email;
    console.log(email);
    // create a hashed password that we store in the database.
    // bcrypt is an optiona nd there are nother options as weool
    const password = req.body.password;
    const result = await submitNewUser(email, password);
    if (result === userStatuses[0]) {
      console.log("Will return true");
      res.status(200).json({ userAdded: true });
    }

    if (result === userStatuses[1]) {
      console.log("Will return false");
      res.status(200).json({ userAdded: false, reason: "User already exists" });
    }
  } catch (error) {
    console.log("Will return error");
    res.status(500).json({ Error: "An error occurred" + error });
  }
  // We will get the username and password from the post request like req.username
  // We will call the the mongodb database and collection
  // We will attempt to enter a username and a password
  // We will see if we get a 200 succes sor other sudccess indicator
  // we could even attempt to fetch this, and if we fetch it, then we can say success
  // alternative is function requestHandler(req, res)
});

async function submitNewUser(email, password) {
  console.log("in submit new user method");
  console.log(email);
  try {
    db = await connectToMongoDB();
    const users_collection = db.collection("Users");
    const one = await users_collection.findOne();
    console.log(one);
    const newUserData = {
      email: email,
      password: password,
    };
    // Add a method to check to see if the email already exist int he database.
    // console.log("made it here");
    if (await doesUserExist(users_collection, email)) {
      return "user already exists";
    } else {
      const result = await users_collection.insertOne(newUserData);
      console.log("New user inserted successfully", result.insertedId);
      return "user created";
      // }
      // Insert the document into the collection
    }
  } catch (error) {
    console.log("error", error);
    // throw new Error("Error inserting data", error);
  }
}

async function doesUserExist(collection, email) {
  console.log("made it here inside does User exist");
  try {
    const query = { email: { $eq: email } };
    const cursor = await collection.find(query);
    const documents = await cursor.toArray();

    console.log("made it inside of the find query");
    if (documents.length > 0) {
      console.log("User exists in the collection");
      return true;
    } else {
      console.log("User does not exist in the collection");
      return false;
    }
  } catch (error) {
    throw new Error("Issue checking for existing user", error);
  }
}

// Route to login the user into the database,
// This will be updated to whether the user and password exist in the database
// app.post("/login", async (req, res) => {
//   try {
//     await passport.authenticate("local", async (err, user, info) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//       }
//       if (!user) {
//         res.status(200).json({ validLogin: false });
//       }
//       res.status(200).json({ validLogin: true });
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// app.post('/login', )

// Route to find whether the user and password exist in the database
// If they do then another page will be able to open and load where the individuals has access to chat.
// We aslo want the person to be able to pull up their historical queries and recipes.
// We want to use some type of react componnet that does this well.

// Route to put queries into the database

// Route to put response into the database
// When we save responses, we want to be able for those response to have a name.

// Route to get recipes by user - using the session data.
// app.get("/api", (req, res) => {
//   res.json({ users: ["userOne", "userTwo", "userThree"] });
// });

// Route to get queries by user - using the session data

// Route to delete the recipe and queries for a user.

app.listen(5000, () => {
  console.log("Server started on port 5000"); // To start our dev server from the server directory, run command npm run dev
  // Going to browswer with localhost:5000/api (will allow us to see our users)
});
