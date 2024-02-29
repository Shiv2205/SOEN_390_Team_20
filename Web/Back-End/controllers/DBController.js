const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");

const currentDB = 'jest_data.txt';//test_data.txt
const ddlPath = path.join(process.cwd() + "/sql/ddl.sql");
const testData = path.join(process.cwd(), "/sql/populate.sql");
const currentDBPath = path.join(process.cwd() + `/data/${currentDB}`);

let instance = null;

/* The DBController class is a JavaScript class that provides methods for initializing and closing a
database connection. */
class DBController {
  constructor(DBPath=currentDBPath) {
    this.initialize(DBPath);
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  /**
   * The `initialize` function checks if a database exists, and if not, creates tables based on a
   * provided DDL file.
   */
  async initialize(DBPath=currentDBPath) {
    this.db = new sqlite3.Database(DBPath);//new sqlite3.cached.Database(currentDBPath);
    return new Promise((resolve, reject) => {
      fs.stat(currentDBPath, (err, stats) => {
        if (err) {
          console.log("Database does not exist");
          this.db.serialize(() => {
            console.log("Inside actual function")
            let ddl = fs.readFileSync(ddlPath, "utf8");
            let tables = ddl.split(";--");
            tables.map((createTable) => {
              if (createTable) this.db.run(createTable.trim() + ";"); // DDL to create table
            });
          });
          resolve({ init: "Database initialized" });
        } 
        else {
          resolve({ init: "Database ready" });
        }
      });
    });
  }

  async populate() {
    return new Promise((resolve, reject) => {
      fs.stat(currentDBPath, (err, stats) => {
        if (!err) {
          console.log("Database ready");
          this.db = new sqlite3.cached.Database(currentDBPath);
          this.db.serialize(() => {
            let ddl = fs.readFileSync(testData, "utf8");
            let tables = ddl.split(";");
            tables.map((DummyData) => {
              if (DummyData) {
                this.db.run(DummyData.trim() + ";"); // DML to populate table
              }
            });
          });
          resolve({ populate: "Database populated" });
        } else {
          console.log({ populate: "Database does not exist" });
        }
      });
    });
  }

  async recordExists(table_name, id_column_name, record_id) {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT COUNT(*) AS count FROM ${table_name} WHERE ${id_column_name} = $record_id`,
        { $record_id: record_id },

        function (err, row) {
          console.log("Inside recordExists: ", row);
          if (row.count > 0) resolve(true);
          else resolve(false);
        }
      );
    });
  }


  /**
   * The function `createNewPublicUser` creates a new public user in a database if the user does not
   * already exist.
   * @returns The `createNewPublicUser` function returns a Promise that resolves to an object
   * containing either a status of 201 and the newly created account_id if the user was successfully
   * created, or a status of 400 and a message indicating that the user is already registered if an
   * existing user with the same email is found.
   */
  async createNewPublicUser({
    fullname,
    email,
    password,
    phoneNumber = null,
    profilePicture = null,
    account_type = "Public",
  }) {
    let existingUser = await this.recordExists("account", "email", email);
    return new Promise((resolve, reject) => {
      if (!existingUser) {
        let account_id = uuid.v4();
        this.db.run(
          "INSERT INTO account (account_id, fullname, password, email, phone_number, profile_picture, account_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            account_id,
            fullname,
            password,
            email,
            phoneNumber,
            profilePicture,
            account_type,
          ]
        );
        resolve({ status: 201, account_id: account_id });
      }
      resolve({ status: 400, message: "User already resgistered!" });
    });
  }

  async getPublicUser(email, password) {
    let existingUser = await this.recordExists("account", "email", email);
    return new Promise(async (resolve, reject) => {
      if (existingUser) {
        this.db.get(
          `SELECT 
          account_id,
          fullname,
          email,
          phone_number,
          profile_picture,
          account_type 
          FROM account 
          WHERE email = ? AND password = ?`,
          [email, password],
          function (err, row) {
            if (row) resolve({ status: 202, data: row });
            if (err) reject(err);
          }
        );
        resolve({ status: 400, message: "Something  went wrong" });
      } else {
        resolve({ status: 400, message: "User does not have an account." });
      }
    });
  }

  /**
   * The function `createNewEmployee` inserts a new employee into a database table with the provided
   * information.
   */
  async createNewEmployee({
    fullname,
    email,
    password,
    property_id = null,
    type,
  }) {
    let existingUser = await this.recordExists("account", "email", email);
    return new Promise(async (resolve, reject) => {
      if (!existingUser) {
        employee_id = await this.createNewPublicUser({
          fullname,
          email,
          password,
          account_type: "Employee",
        });
        this.db.run(
          "INSERT INTO employee (employee_id, property_id, type) VALUES (?, ?, ?)",
          [employee_id, property_id, type]
        );
        resolve({ status: 201, employee_id: employee_id });
      } else {
        existingUser = await this.getPublicUser(email, password);
        this.db.run(
          "INSERT INTO employee (employee_id, property_id, type) VALUES (?, ?, ?)",
          [existingUser.account_id, property_id, type]
        );
        resolve({ status: 201, employee_id: existingUser.account_id });
      }
    });
  }

  async getEmployee(email, password) {
    let existingUser = await this.recordExists("employee_data", "email", email);
    return new Promise(async (resolve, reject) => {
      if (existingUser) {
        this.db.get(
          "SELECT * FROM employee_data WHERE email = ? AND password = ?",
          [email, password],
          function (err, row) {
            if (row) resolve({ status: 202, data: row });
            if (err) reject(err);
          }
        );
      } else {
        reject({ status: 400, message: "User does not have an account." });
      }
    });
  }

  async getAllEmployees(property_id) {
    let propertyExists = await this.recordExists(
      "property",
      "property_id",
      property_id
    );
    return new Promise(async (resolve, reject) => {
      if (propertyExists) {
        this.db.all(
          `SELECT E.*
          FROM employee_data E 
          JOIN work_at W ON E.employee_id = W.employee_id
          WHERE W.property_id = ?;`,
          property_id,
          function (err, rows) {
            if (err) reject(err);
            if (rows.length > 0) resolve({ status: 200, data: rows });
          }
        );
      } else {
        resolve({
          status: 204,
          message: "No employees found for given property",
        });
      }
    });
  }

  async createNewProperty({
    unit_count,
    parking_count,
    locker_count,
    address,
    picture = "",
  }) {
    let propertyExists = await this.recordExists(
      "property",
      "address",
      address
    );
    return new Promise((resolve, reject) => {
      if (!propertyExists) {
        let property_id = uuid.v4();
        this.db.run(
          "INSERT INTO property (property_id, unit_count, parking_count, locker_count, address, picture) VALUES (?, ?, ?, ?, ?, ?)",
          [property_id, unit_count, parking_count, locker_count, address, picture]
        );
        resolve({ status: 201, property_id: property_id });
      }
      reject({ status: 400, message: "Property already exists!" });
    });
  }

  async getProperty(property_id) {
    let propertyExists = await this.recordExists(
      "property",
      "property_id",
      property_id
    );
    return new Promise(async (resolve, reject) => {
      if (propertyExists) {
        this.db.get(
          "SELECT * FROM property WHERE property_id = ?;",
          property_id,
          function (err, row) {
            if (row) resolve({ status: 202, data: row });
            if (err) reject(err);
          }
        );
      } else {
        reject({
          status: 400,
          message: "Property does not exist in database.",
        });
      }
    });
  }

  async getAllProperties(employee_id) {
    let employeeExists = await this.recordExists(
      "employee",
      "employee_id",
      employee_id
    );
    return new Promise(async (resolve, reject) => {
      if (employeeExists) {
        this.db.all(
          `SELECT P.*
          FROM property P
          WHERE P.property_id IN 
          (SELECT W.property_id
           FROM work_at W
           JOIN employee E ON E.employee_id = W.employee_id
           AND E.employee_id = ?);`,
          [employee_id],
          function (err, rows) {
            if (err) reject(err);
            if (rows) {
              if (rows.length > 0) resolve({ status: 200, data: rows });
            }
          }
        );
      } else {
        resolve({
          status: 204,
          message: "No properties found for given employee",
        });
      }
    });
  }

  async createNewUnit({
    property_id,
    size,
    monthly_rent,
    condo_fee,
    condo_balance,
    owner_id = "",
    renter_id = "",
    owner_registration_key = "",
    renter_registration_key = "",
  }) {
    return new Promise((resolve, reject) => {
      let unit_id = uuid.v4();
      this.db.run(
        `INSERT INTO unit 
          (unit_id, property_id, size, monthly_rent, condo_fee, condo_balance, owner_id, 
          renter_id, owner_registration_key, renter_registration_key) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          unit_id,
          property_id,
          size,
          monthly_rent,
          condo_fee,
          condo_balance,
          owner_id,
          renter_id,
          owner_registration_key,
          renter_registration_key,
        ]
      );
      resolve({ status: 201, unit_id: unit_id });
    });
  }

  async getUnit(unit_id) {
    let unitExists = await this.recordExists("unit", "unit_id", unit_id);
    return new Promise(async (resolve, reject) => {
      if (unitExists) {
        this.db.get(
          `SELECT 
            unit_id,
            property_id,
            size,
            monthly_rent,
            condo_fee,
            condo_balance,
            owner_id,
            renter_id 
          FROM unit WHERE unit_id = ?;`,
          unit_id,
          function (err, row) {
            if (row) resolve({ status: 202, data: row });
            if (err) reject(err);
          }
        );
      } else {
        reject({
          status: 400,
          message: "Unit does not exist in database.",
        });
      }
    });
  }

  async getAllUnits(property_id) {
    let unitExists = await this.recordExists(
      "unit",
      "property_id",
      property_id
    );
    return new Promise(async (resolve, reject) => {
      const unit_data = [];
      if (unitExists) {
        this.db.all(
          `SELECT 
            unit_id,
            property_id,
            size,
            monthly_rent,
            condo_fee,
            condo_balance,
            owner_id,
            renter_id 
          FROM unit 
          WHERE property_id = ?;`,
          property_id,
          function (err, rows) {
            if (err) reject(err);
            if (rows) if (rows.length > 0) resolve({ status: 200, data: rows });
          }
        );
      } else {
        resolve({
          status: 204,
          message: "Property does not have any units in database.",
        });
      }
    });
  }

  async createNewPost({ property_id, creator_id, content, replied_to = "" }) {
    return new Promise((resolve, reject) => {
      let post_id = uuid.v4();
      this.db.run(
        `INSERT INTO post 
          (post_id, property_id, creator_id, content, replied_to) 
          VALUES (?, ?, ?, ?, ?)`,
        [post_id, property_id, creator_id, content, replied_to]
      );
      resolve({ status: 201, post_id: post_id });
    });
  }

  async getAllUserPosts(creator_id) {
    let postsExists = await this.recordExists("post", "creator_id", creator_id);
    return new Promise(async (resolve, reject) => {
      if (postsExists) {
        this.db.all(
          "SELECT * FROM post WHERE creator_id = ?;",
          creator_id,
          function (err, rows) {
            if (err) reject(err);
            if (rows) if (rows.length > 0) resolve({ status: 200, data: rows });
          }
        );
      } else {
        resolve({
          status: 204,
          message: "User has no posts in database.",
        });
      }
    });
  }

  async getAllPostsReplies(post_id) {
    let postsExists = await this.recordExists(
      "post",
      "post_id",
      post_id
    );
    return new Promise(async (resolve, reject) => {
      if (postsExists) {
        this.db.all(
          "SELECT * FROM post WHERE post_id = ?;",
          post_id,
          function (err, rows) {
            if (err) reject(err);
            if(rows) if (rows.length > 0) resolve({ status: 200, data: rows });
          }
        );
      } else {
        resolve({
          status: 204,
          message: "No replies for this post in database.",
        });
      }
    });
  }

  async getAllPropertyPosts(property_id) {
    let postsExists = await this.recordExists(
      "post",
      "property_id",
      property_id
    );
    return new Promise(async (resolve, reject) => {
      if (postsExists) {
        this.db.all(
          "SELECT * FROM post WHERE property_id = ?;",
          property_id,
          function (err, rows) {
            if (err) reject(err);
            if (rows.length > 0) resolve({ status: 200, data: rows });
          }
        );
      } else {
        resolve({
          status: 204,
          message: "Property has no posts in database.",
        });
      }
    });
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
