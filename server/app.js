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

// check if demo user admin has table if not, create one
db.run(
  `CREATE TABLE IF NOT EXISTS admin (attendee_id INTEGER PRIMARY KEY, firstName TEXT NOT NULL, email TEXT NOT NULL, lastName TEXT NOT NULL, age INTEGER NOT NULL);`
);

app.post("/addUser", (req, res) => {
  const { userID, username, password } = req.body;
  console.log(username);
  db.run(
    `CREATE TABLE IF NOT EXISTS ${username} (user_id INTEGER PRIMARY KEY, firstName TEXT NOT NULL, email TEXT NOT NULL, lastName TEXT NOT NULL, age INTEGER NOT NULL);`
  );
  db.run(
    `INSERT INTO ${username} (user_id ,firstName, lastName, email, age) VALUES ( 1 ,'Placeholder', 'Placeholder', 'Placeholder', 0)`
  );
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
        res.send({ validation: true, username: rows[0].username });
      } else {
        res.send({ validation: false });
      }
    }
  );
});

// extract data from database using username and send it to the client

// add new attendee to the database
app.post("/addAttendee", (req, res) => {
  const { username, id, firstName, lastName, email, age } = req.body;

  db.run(
    `INSERT INTO ${username} (user_id, firstName, lastName, email, age) VALUES ( ${id}, '${firstName}', '${lastName}', '${email}', '${age}')`,
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ message: "user added" });
    }
  );
});

// create a new user

app.post("/getData", (req, res) => {
  const { username } = req.body;
  console.log(username);

  db.all(`select * from ${username} `, (err, rows) => {
    if (err) {
      throw err;
    }
    if (rows.length > 0) {
      const attendees = rows.map((row) => {
        return {
          attendeeID: row.user_id,
          firstName: row.firstName,
          lastName: row.lastName,
          email: row.email,
          age: row.age,
        };
      });
      res.send({ attendees: attendees });
    } else {
      res.send({ data: [] });
    }
  });
});
app.listen(3001, () => console.log("Listening on http://localhost:3001"));
