const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const uuid = require("uuid");

const filePath = "../sql/ddl.sql";

/* The DBController class is a JavaScript class that provides methods for initializing and closing a
database connection. */
class DBController {
  constructor(DBPath = "../data/test_data.txt") {
    this.db = new sqlite3.cached.Database(DBPath);
  }

  initialize() {
    this.db.serialize(() => {
      let ddl = fs.readFileSync(filePath, "utf8");
      this.db.run(ddl); // DDL to create table
    });
  }

  createNewPublicUser({ fullname, email, password }) {
    let account_id = uuid.v4();
    this.db.run(
      "INSERT INTO account VALUES (account_id, fullname, email, password)",
      [account_id, fullname, email, password],
      this.queryError(err)
    );
    return account_id;
  }

  createNewEmployee({ fullname, email, password, property_id, type }) {
    this.db.run(
      "INSERT INTO employee VALUES (employee_id, property_id, type)",
      [this.createNewPublicUser(fullname, email, password), property_id, type],
      this.queryError(err)
    );
  }

  queryError(err) {
    if (err) console.log(err);
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  }
}

module.exports = DBController;

/**
 * db.run('INSERT INTO Users (name, email) VALUES (?, ?)', "John", "johndoe@gmail.com");
    db.run('INSERT INTO Users (name, email) VALUES (?, ?)', "Jane", "janedoe@gmail.com");
  
    db.each("SELECT * FROM users WHERE name = ?", "Jane", (err, row) => {
      console.log(row);
    });
 */
