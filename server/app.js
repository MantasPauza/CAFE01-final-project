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
db.run("DROP TABLE IF EXISTS Mantas;");
// check if demo user admin has table if not, create one
db.run(
  `CREATE TABLE IF NOT EXISTS admin (attendee_id INTEGER PRIMARY KEY, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT NOT NULL, age INTEGER NOT NULL);`
);

// check if username is already taken and return true or false
// if false, create new user in database
app.post("/addUser", (req, res) => {
  const { id, username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
    if (err) {
      console.log(err);
    }
    if (row) {
      res.send({ message: "User already exists" });
    } else {
      db.run(
        `INSERT INTO users (user_id, username, password) VALUES (?, ?, ?)`,
        [id, username, password],
        function (err) {
          if (err) {
            return console.log(err.message);
          }
          if (res.statusCode === 200) {
            console.log("User added");
          } else {
            return res.send({ message: "User not added" });
          }
        }
      );
    }
  });
  //checking if user's table exists for data storage and if not, creating one
  db.run(
    `CREATE TABLE IF NOT EXISTS ${username} (attendee_id INTEGER PRIMARY KEY, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT NOT NULL, age INTEGER NOT NULL);`,
    (err) => {
      if (err) {
        console.log(err);
      }
      if (res.statusCode === 200) {
        return res.send({ success: true, message: "user added" });
      } else {
        return res.send({ success: false, message: "user not added" });
      }
    }
  );
});
// receive data from front-end and updating user's data table with given values using given id to identify which row.
app.post("/updateData", (req, res) => {
  const { username, attendee_id, firstName, lastName, email, age } = req.body;
  db.run(
    `UPDATE ${username} SET firstName = ?, lastName = ?, email = ?, age = ? WHERE attendee_id = ?`,
    [firstName, lastName, email, age, attendee_id],
    function (err, rows) {
      if (err) {
        return console.log(err.message);
      }
      if (res.statusCode === 200) {
        return res.send({ success: true, message: "data updated" });
      } else {
        return res.send({ message: "data not updated" });
      }
    }
  );
});

// receive data from front-end and deleting the row with given id from user's data table.
app.post("/deleteData", (req, res) => {
  const { username, attendee_id } = req.body;
  db.run(
    `DELETE
    FROM ${username}
    WHERE attendee_id = ?`,
    [attendee_id],
    function (err, rows) {
      if (err) {
        return console.log(err.message);
      }
      if (res.statusCode === 200) {
        return res.send({ success: true, message: "data deleted" });
      } else {
        return res.send({ message: "data not deleted" });
      }
    }
  );
});
// checking if user exists and if so, checking if password is correct
// if both are true, return true and send user's username back
// also checking if username and password are not empty
// lastly checking if given password is correct and if not, returning that that username is not found
app.post("/validatePassword", (req, res) => {
  const { username, password } = req.body;
  db.all(`select * from users where username = '${username}'`, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    if (rows.length > 0 && rows[0].password === password) {
      res.send({ validation: true, username: rows[0].username });
      return;
    } else if (username === "") {
      res.send({ validation: false, message: "Username cannot be empty" });
      return;
    } else if (password === "") {
      res.send({ validation: false, message: "Please enter your password." });
      return;
    } else if (rows.length > 0 && rows[0].password !== password) {
      res.send({
        validation: false,
        message: "Your password is incorrect. :(",
      });
      return;
    } else {
      res.send({
        validation: false,
        message: "This username is not in our database.",
      });
      return;
    }
  });
});

// receive data from front-end and adding it to user's data table
app.post("/getData", (req, res) => {
  const { username } = req.body;

  db.all(
    `
  SELECT * FROM ${username}
  `,
    (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send({ rows: rows });
      return;
    }
  );
});

// receive data from front-end and adding that data to user's table
app.post("/addAttendee", (req, res) => {
  const { username, id, firstName, lastName, email, age } = req.body;
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
