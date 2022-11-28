const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
  console.log(res.header);
});

app.use(express.json({ limit: "10mb" }));

// create a database connection
let db = new sqlite3.Database("db.sqlite3", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("db.sqlite3 connected");
});

// check if the table exists and create it if it doesn't
db.run(
  "CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL);"
);

// check if the user exists and return true if it does
app.post("/validatePassword", (req, res) => {
  const { username, password } = req.body;

  db.all(
    `select * from users where username = '${username}' and password ='${password}'`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length > 0) {
        res.send({ validation: true });
      } else {
        res.send({ validation: false });
      }
    }
  );
});

// create a new user
app.post("/addUser", (req, res) => {
  const { userID, username, password } = req.body;

  db.all(`select * from users where username = '${username}'`, (err, rows) => {
    if (err) {
      throw err;
    }
    if (rows.length > 0) {
      res.send({ success: false });
    } else {
      db.all(
        `insert into users (user_id, username, password) VALUES ('${userID}', '${username}', '${password}')`,
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
      res.send({ success: true, message: { message: "User created" } });
    }
  });
});

app.listen(3001, () => console.log("Listening on http://localhost:3001"));
