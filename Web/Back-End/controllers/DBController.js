const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const uuid = require("uuid");
const path = require('path');

const filePath = path.join(process.cwd() + "/sql/ddl.sql");
const currentDBPath = path.join(process.cwd() + "/data/test_data.txt");

let instance = null;

/* The DBController class is a JavaScript class that provides methods for initializing and closing a
database connection. */
class DBController {
  constructor(DBPath = currentDBPath) {
    if (!instance) {
      instance = this;
      this.db = new sqlite3.cached.Database(DBPath);
      this.initialize();
    }
    return instance;
  }

  initialize() {
    fs.access(currentDBPath, fs.constants.F_OK, (err) => {
      if (err) {
          console.error('Database does not exist');
          this.db.serialize(() => {
            let ddl = fs.readFileSync(filePath, "utf8");
            let tables = ddl.split(";");
            tables.map((createTable) => {
              if (createTable) this.db.run(createTable.trim() + ";"); // DDL to create table
            });
          });
      } else {
          console.log('Database ready');
      }
  });
  }

  createNewPublicUser({
    fullname,
    email,
    password,
    phoneNumber,
    profilePicture,
  }) {
    let account_id = uuid.v4();
    this.db.run(
      "INSERT INTO account (account_id, fullname, password, email, phone_number, profile_picture) VALUES (?, ?, ?, ?, ?, ?)",
      [account_id, fullname, password, email, phoneNumber, profilePicture]
    );
    return account_id;
  }

  async getPublicUser(email, password) {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM account WHERE email = ? AND password=?;", [email, password], function(err, row){
          if(row) resolve(row);
          if(err) reject(err);
        });
    });
  }

  createNewEmployee({ fullname, email, password, property_id, type }) {
    this.db.run(
      "INSERT INTO employee VALUES (employee_id, property_id, type)",
      [this.createNewPublicUser(fullname, email, password), property_id, type]
    );
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error("Error closing database:", err);
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
