const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");
const { rejects } = require("assert");

const ddlPath = path.join(process.cwd() + "/sql/ddl.sql");
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

  /**
   * The `initialize` function checks if a database exists, and if not, creates tables based on a
   * provided DDL file.
   */
  initialize() {
    fs.access(currentDBPath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error("Database does not exist");
        this.db.serialize(() => {
          let ddl = fs.readFileSync(ddlPath, "utf8");
          let tables = ddl.split(";");
          tables.map((createTable) => {
            if (createTable) this.db.run(createTable.trim() + ";"); // DDL to create table
          });
        });
      } else {
        console.log("Database ready");
      }
    });
  }

  /**
   * The function `createNewPublicUser` creates a new public user in a database if the user does not
   * already exist.
   * @returns The `createNewPublicUser` function is returning a Promise. If there is no existing user
   * with the provided email and password, it will insert a new user into the database and resolve the
   * Promise with the newly created account_id. If an existing user is found, it will reject the
   * Promise with the message "User already registered!".
   */
  async createNewPublicUser({
    fullname,
    email,
    password,
    phoneNumber=null,
    profilePicture=null
  }) {
    let existingUser = await this.isUser(email);
    return new Promise((resolve, reject) => {
      if (existingUser.count === 0) {
        let account_id = uuid.v4();
        this.db.run(
          "INSERT INTO account (account_id, fullname, password, email, phone_number, profile_picture) VALUES (?, ?, ?, ?, ?, ?)",
          [account_id, fullname, password, email, phoneNumber, profilePicture]
        );
        resolve(account_id);
      }
      reject("User already resgistered!");
    });
  }

  async isUser(email) {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT COUNT(*) AS count FROM account WHERE email = ?",
        email,
        function (err, row) {
          console.log("Inside: ", row);
          if (row) resolve(row);
          resolve(null);
        }
      );
    });
  }

  async getPublicUser(email, password) {
    let existingUser = await this.isUser(email);
    return new Promise(async (resolve, reject) => {
      if (existingUser.count > 0) {
        this.db.get(
          "SELECT * FROM account WHERE email = ? AND password = ?",
          [email, password],
          function (err, row) {
            if (row) resolve(row);
            if (err) reject(err);
          }
        );
      }
      else{reject("User does not have an account.");}
    });
  }

  /**
   * The function `createNewEmployee` inserts a new employee into a database table with the provided
   * information.
   */
  async createNewEmployee({ fullname, email, password, property_id=null, type }) {
    let existingUser = await this.isUser(email);
    return new Promise(async (resolve, reject) => {
      if (existingUser.count === 0) {
        employee_id = await this.createNewPublicUser({ fullname, email, password });
        this.db.run(
          "INSERT INTO employee (employee_id, property_id, type) VALUES (?, ?, ?)",
          [employee_id, property_id, type]
        );
        resolve(employee_id);
      }
      else {
        existingUser = await this.getPublicUser(email, password);
        this.db.run(
          "INSERT INTO employee (employee_id, property_id, type) VALUES (?, ?, ?)",
          [existingUser.account_id, property_id, type]
        );
        resolve(existingUser.account_id);
      }
    });
  }

  async getEmployee(email, password) {
    let existingUser = await this.isUser(email);
    return new Promise(async (resolve, reject) => {
      if (existingUser.count > 0) {
        this.db.get(
          "SELECT * FROM employee_data WHERE email = ? AND password = ?",
          [email, password],
          function (err, row) {
            if (row) resolve(row);
            if (err) reject(err);
          }
        );
      }
      else{reject("User does not have an account.");}
    });
  }

  run(query) {
    this.db.run(query);
  }

  /**
   * The close method closes the database connection and logs a message indicating whether the
   * operation was successful or if an error occurred.
   */
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
