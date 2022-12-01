const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
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

// check if username is already taken and return true or false
// if false, create new user in database
app.post("/addUser", (req, res) => {
  const { id, username, password } = req.body;
    db.get(
      `SELECT * FROM users WHERE username = ?`,
      [username],
      (err, row) => {
        if (err) {
          console.log(err);
        }
        if (row) {
          res.send({message: "user already exists"});
        } else {
          db.run(
            `INSERT INTO users (user_id, username, password) VALUES (?, ?, ?)`,
            [id, username, password],
            function (err) {
              if (err) {
                return console.log(err.message);
              }
              if(res.statusCode === 200) {
                console.log("user added");
              } else {
                return res.send({ message: "user not added" });
              }
            }
          );
        }
      }
    );
  db.run(
    `CREATE TABLE IF NOT EXISTS ${username} (attendee_id INTEGER PRIMARY KEY, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT NOT NULL, age INTEGER NOT NULL);`, (err) => {
      if (err) {
        console.log(err);
      } 
       if(res.statusCode === 200) {
        return res.send({ success: true, message: "user added" });
      } else {
        return res.send({ success: false, message: "user not added" });
      }
    }
  );

});

app.post("/validatePassword", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  db.all(
    `select * from users where username = '${username}' and password ='${password}'`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      if (rows.length > 0) {
         res.send({ validation: true, username: rows[0].username });
         return;
      } else {
        res.send({ validation: false });
        return;
      }
    }
  );
});

app.post("/getData", (req, res) => {
  const { username } = req.body;
  console.log(username);

  db.all(`
  SELECT * FROM ${username}
  `, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
      res.send({ rows: rows });
      return;
  });

});

app.post("/addAttendee", (req, res) => {
  const { username, id, firstName, lastName, email, age } = req.body;
  console.log(username);
  db.run(
    `INSERT INTO ${username} (attendee_id, firstName, lastName, email, age) VALUES ( ${id}, '${firstName}', '${lastName}', '${email}', '${age}')`,
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ message: "user added" });
      return;
    }
  );
});

app.listen(3001, () => console.log("Listening on http://localhost:3001"));
