import * as sqlite3 from "sqlite3";
import * as fs from "fs";
import * as uuid from "uuid";
import * as path from "path";
import IDBController from "../interfaces/IDBController";
import {
  EmployeeData,
  EmployeeDetails,
  PostData,
  PostDetails,
  PropertyData,
  PublicUserData,
  UnitData,
  UnitDetails,
  UserData,
  RequestDetails,
  RequestStatus,
  RequestData,
  EventData,
  EventDetails,
  EventAttendee,
  NotFound,
} from "../types/DBTypes";

const currentDB = "test_data.sqlite3"; // test_data.txt
const ddlPath = path.join(process.cwd(), "/sql/ddl.sql");
const testData = path.join(process.cwd(), "/sql/populate.sql");
const currentDBPath = path.join(process.cwd(), `/data/${currentDB}`);

class DBController implements IDBController {
  readonly db: sqlite3.Database;

  constructor(DBPath: string = currentDBPath) {
    this.db = new sqlite3.Database(DBPath);
  }

  async initialize(DBPath: string = currentDBPath): Promise<{ init: string }> {
    return new Promise((resolve, reject) => {
      //fs.stat(currentDBPath, (err, stats) => {
        // if (!err) {
          this.db.serialize(() => {
            let ddl = fs.readFileSync(ddlPath, "utf8");
            let tables = ddl.split("--");
            tables.map((createTable) => {
              if (createTable) this.db.run(createTable.trim() + ";"); // DDL to create table
            });
          });
          resolve({ init: "Database initialized" });
        // } else {
        //   resolve({ init: "Database ready" });
        // }
      //});
    });
  }

  async populate(): Promise<{ populate: string }> {
    return new Promise((resolve, reject) => {
      // fs.stat(currentDBPath, undefined, (err, stats) => {
      //   if (!err) {
          // console.log("Database ready");
          // this.db = new sqlite3.Database(currentDBPath);
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
        // } else {
        //   reject({ populate: "Database does not exist" });
        // }
      //});
    });
  }

  async recordExists(
    table_name: string,
    id_column_name: string,
    record_id: any
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT COUNT(*) AS count FROM ${table_name} WHERE ${id_column_name} = $record_id`,
        { $record_id: record_id },
        function (err, row: { count: number }) {
          if (row.count > 0) resolve(true);
          else resolve(false);
        }
      );
    });
  }

  async createNewPublicUser({
    fullname,
    email,
    password,
    phone_number = "",
    profile_picture = "",
    account_type = "Public",
  }: UserData & {
    account_type?: "Public" | "Owner" | "Renter" | "Employee" | "Admin";
  }): Promise<{ status: number; account_id?: string; message?: string }> {
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
            phone_number,
            profile_picture,
            account_type,
          ]
        );
        resolve({ status: 201, account_id: account_id });
      }
      resolve({ status: 400, message: "User already resgistered!" });
    });
  }

  async getPublicUser(
    email: string
  ): Promise<{ status: number; data?: PublicUserData; message?: string }> {
    let existingUser = await this.recordExists("account", "email", email);
    return new Promise(async (resolve, reject) => {
      if (existingUser) {
        this.db.get(
          `SELECT 
                    account_id,
                    fullname,
                    email,
                    password,
                    phone_number,
                    profile_picture,
                    account_type 
                    FROM account 
                    WHERE email = ?`,
          [email],
          function (err, row: PublicUserData) {
            if (row) resolve({ status: 202, data: row });
            if (err) reject(err);
          }
        );
      } else {
        resolve({ status: 400, message: "User does not have an account." });
      }
    });
  }

  async createNewEmployee({
    fullname,
    email,
    password,
    property_id = null,
    type,
  }: EmployeeData): Promise<{
    status: number;
    employee_id?: string;
    message?: string;
  }> {
    let userExists = await this.recordExists("account", "email", email);
    return new Promise(async (resolve, reject) => {
      if (!userExists) {
        let employee_id = (
          await this.createNewPublicUser({
            fullname,
            email,
            password,
            account_type: "Employee",
          })
        ).account_id;
        this.db.run(
          "INSERT INTO employee (employee_id, property_id, type) VALUES (?, ?, ?)",
          [employee_id, property_id, type]
        );
        resolve({ status: 201, employee_id: employee_id });
      } else {
        let existingUser = await this.getPublicUser(email);
        let account_id = existingUser.data?.account_id;
        this.db.run(
          "INSERT INTO employee (employee_id, property_id, type) VALUES (?, ?, ?)",
          [account_id, property_id, type]
        );
        resolve({ status: 201, employee_id: account_id });
      }
    });
  }

  async getEmployee(
    email: string,
  ): Promise<{ status: number; data?: EmployeeDetails; message?: string }> {
    let existingUser = await this.recordExists("employee_details", "email", email);
    return new Promise(async (resolve, reject) => {
      if (existingUser) {
        this.db.get(
          `SELECT 
            employee_id,
            type,
            fullname,
            email,
            phone_number,
            profile_picture
          FROM employee_details 
          WHERE email = ? `, //AND password = ?`,
          [email], // password],
          function (err, row: EmployeeDetails) {
            if (row) resolve({ status: 202, data: row });
            if (err) reject(err);
          }
        );
      } else {
        reject({ status: 400, message: "User does not have an account." });
      }
    });
  }

  async getAllEmployees(
    property_id: string
  ): Promise<{ status: number; data?: EmployeeDetails[]; message?: string }> {
    let propertyExists = await this.recordExists(
      "property",
      "property_id",
      property_id
    );
    return new Promise(async (resolve, reject) => {
      if (propertyExists) {
        this.db.all(
          `SELECT *
           FROM employee_details 
           WHERE property_id = ?;`,
          property_id,
          function (err, rows: EmployeeDetails[]) {
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
    admin_id,
    unit_count,
    parking_count,
    locker_count,
    address,
    picture = "",
  }: PropertyData): Promise<{
    status: number;
    property_id?: string;
    message?: string;
  }> {
    let propertyExists = await this.recordExists(
      "property",
      "address",
      address
    );
    return new Promise((resolve, reject) => {
      if (!propertyExists) {
        let property_id = uuid.v4();
        this.db.run(
          "INSERT INTO property (property_id, admin_id, unit_count, parking_count, locker_count, address, picture) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            property_id,
            admin_id,
            unit_count,
            parking_count,
            locker_count,
            address,
            picture,
          ]
        );
        resolve({ status: 201, property_id: property_id });
      }
      reject({ status: 400, message: "Property already exists!" });
    });
  }

  async getProperty(
    property_id: string
  ): Promise<{ status: number; data?: PropertyData; message?: string }> {
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
          function (err, row: PropertyData) {
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

  async getAllProperties(
    admin_id: string
  ): Promise<{ status: number; data?: PropertyData[]; message?: string }> {
    let adminExists = await this.recordExists(
      "CMC_Admin",
      "admin_id",
      admin_id
    );
    return new Promise(async (resolve, reject) => {
      if (adminExists) {
        this.db.all(
          `SELECT *
          FROM property
          WHERE admin_id = ?;`,
          [admin_id],
          function (err: Error, rows: PropertyData[]) {
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
    occupant_id = "",
    occupant_registration_key = "",
    occupant_type,
  }: UnitData): Promise<{
    status: number;
    unit_id?: string;
    message?: string;
  }> {
    return new Promise((resolve, reject) => {
      let unit_id = uuid.v4();
      this.db.run(
        `INSERT INTO unit 
                (unit_id, property_id, size, monthly_rent, condo_fee, condo_balance, occupant_id,
                occupant_registration_key,
                occupant_type) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          unit_id,
          property_id,
          size,
          monthly_rent,
          condo_fee,
          condo_balance,
          occupant_id,
          occupant_registration_key,
          occupant_type,
        ]
      );
      resolve({ status: 201, unit_id: unit_id });
    });
  }

  async getUnit(
    unit_id: string
  ): Promise<{ status: number; data?: UnitDetails; message?: string }> {
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
                    occupant_id
                    FROM unit WHERE unit_id = ?;`,
          unit_id,
          function (err, row: UnitDetails) {
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

  async getOccupiedUnit(
    occupant_id: string
  ): Promise<{ status: number; data?: UnitDetails; message?: string }> {
    let unitExists = await this.recordExists(
      "unit",
      "occupant_id",
      occupant_id
    );
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
                    occupant_id
                    FROM unit WHERE occupant_id = ?;`,
          occupant_id,
          function (err, row: UnitDetails) {
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

  async getAllUnits(
    property_id: string
  ): Promise<{ status: number; data?: UnitDetails[]; message?: string }> {
    let unitExists = await this.recordExists(
      "unit",
      "property_id",
      property_id
    );
    return new Promise(async (resolve, reject) => {
      if (unitExists) {
        this.db.all(
          `SELECT 
                    unit_id,
                    property_id,
                    size,
                    monthly_rent,
                    condo_fee,
                    condo_balance,
                    occupant_id
                    FROM unit 
                    WHERE property_id = ?;`,
          property_id,
          function (err, rows: UnitDetails[]) {
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

  async createNewPost({
    property_id,
    creator_id,
    content,
    replied_to = "",
  }: PostData): Promise<{ status: number; post_id: string }> {
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

  async getAllUserPosts(
    creator_id: string
  ): Promise<{ status: number; data?: PostDetails[]; message?: string }> {
    let postsExists = await this.recordExists("post", "creator_id", creator_id);
    return new Promise(async (resolve, reject) => {
      if (postsExists) {
        this.db.all(
          "SELECT * FROM post_details WHERE creator_id = ?;",
          creator_id,
          function (err, rows: PostDetails[]) {
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

  async getAllPostsReplies(
    post_id: string
  ): Promise<{ status: number; data?: PostDetails[]; message?: string }> {
    let postsExists = await this.recordExists("post", "post_id", post_id);
    return new Promise(async (resolve, reject) => {
      if (postsExists) {
        this.db.all(
          "SELECT * FROM post_details WHERE replied_to = ?;",
          post_id,
          function (err, rows: PostDetails[]) {
            if (err) reject(err);
            if (rows) if (rows.length > 0) resolve({ status: 200, data: rows });
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

  async getAllPropertyPosts(
    property_id: string
  ): Promise<{ status: number; data?: PostDetails[]; message?: string }> {
    let postsExists = await this.recordExists(
      "post",
      "property_id",
      property_id
    );
    return new Promise(async (resolve, reject) => {
      if (postsExists) {
        this.db.all(
          "SELECT * FROM post_details WHERE property_id = ?;",
          property_id,
          function (err, rows: PostDetails[]) {
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

  async createNewRequest({
    unit_id,
    type,
    description,
  }: RequestData): Promise<{ status: number; request_id: string }> {
    return new Promise((resolve, reject) => {
      const request_id = uuid.v4(); // Generate a unique request_id using uuid

      this.db.run(
        `INSERT INTO request 
              (request_id, employee_id, type, description, status) 
              VALUES (?, ?, ?, ?, ?)`,
        [request_id, "Unassigned", type, description, RequestStatus.Received],
        (err) => {
          if (err) {
            reject({
              status: 500,
              message: "Error making request to database.",
            });
          } else {
            resolve({ status: 201, request_id });
          }
        }
      );
    });
  }

  async getRequest(
    request_id: string
  ): Promise<{ status: number; data?: RequestDetails; message?: string }> {
    let requestExists = await this.recordExists(
      "request",
      "request_id",
      request_id
    );
    return new Promise(async (resolve, reject) => {
      if (requestExists) {
        this.db.get(
          `SELECT *
            FROM request 
            WHERE request_id = ?;`,
          request_id,
          function (err, row: RequestDetails) {
            if (row) resolve({ status: 200, data: row });
            if (err) reject(err);
          }
        );
      } else {
        reject({
          status: 400,
          message: "Request does not exist in database.",
        });
      }
    });
  }

  async getAllEmployeeRequests(
    employee_id: string
  ): Promise<{ status: number; data?: RequestDetails[]; message?: string }> {
    try {
      const requests: RequestDetails[] = await new Promise(
        (resolve, reject) => {
          this.db.all(
            `SELECT *
          FROM request
          WHERE employee_id = ${employee_id};`,
            function (err, rows: RequestDetails[]) {
              if (err) {
                reject({
                  status: 500,
                  message: "Error fetching requests from database.",
                });
              } else {
                resolve(rows);
              }
            }
          );
        }
      );

      return {
        status: 200,
        data: requests,
        message: "All requests retrieved successfully.",
      };
    } catch (error) {
      return { status: 500, message: (error as Error).message };
    }
  }

  async getAllUnitRequests(
    unit_id: string
  ): Promise<{ status: number; data?: RequestDetails[]; message?: string }> {
    try {
      const requests: RequestDetails[] = await new Promise(
        (resolve, reject) => {
          this.db.all(
            `SELECT *
          FROM request
          WHERE unit_id = ${unit_id};`,
            function (err, rows: RequestDetails[]) {
              if (err) {
                reject({
                  status: 500,
                  message: "Error fetching requests from database.",
                });
              } else {
                resolve(rows);
              }
            }
          );
        }
      );

      return {
        status: 200,
        data: requests,
        message: "All requests retrieved successfully.",
      };
    } catch (error) {
      return { status: 500, message: (error as Error).message };
    }
  }

  async createNewEvent({
    host_id,
    title,
    description,
    date_and_time,
  }: EventData): Promise<{ status: number; event_id: string } | NotFound> {
    return new Promise((resolve, reject) => {
      const event_id = uuid.v4(); // Generate a unique event_id using uuid

      this.db.run(
        `INSERT INTO events 
              (event_id, host_id, title, description, date_and_time) 
              VALUES (?, ?, ?, ?, ?)`,
        [event_id, host_id, title, description, date_and_time],
        (err) => {
          if (err) {
            reject({
              status: 500,
              message: "Error creating event in database.",
            });
          } else {
            resolve({ status: 201, event_id });
          }
        }
      );
    });
  }
  async getAllEvents(
  ): Promise<{ status: number; data: EventDetails[] } | NotFound> {
    return new Promise(async (resolve, reject) => {
      this.db.all(
          "SELECT * FROM events;",
          function (err, rows: EventDetails[]) {
            if (err) reject(err);
            if (rows.length > 0) resolve({ status: 200, data: rows });
          }
      )
        })
      } 

  
  async getHostEvents(
    host_id: string
  ): Promise<{ status: number; data: EventDetails[] } | NotFound> {
    let eventExists = await this.recordExists("events", "host_id", host_id);
    return new Promise(async (resolve, reject) => {
      if (eventExists) {
        this.db.all(
          "SELECT * FROM events_details WHERE host_id = ?;",
          host_id,
          function (err, rows: EventDetails[]) {
            if (err) reject(err);
            if (rows.length > 0) resolve({ status: 200, data: rows });
          }
        );
      } else {
        resolve({
          status: 204,
          message: "User has no events in database.",
        });
      }
    });
  }



  async registerNewAttendee(
    event_id: string,
    attendee_id: string
  ): Promise<{ status: number; event_id: string; attendee_id: string }> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO events_attendees
              (event_id, attendee_id)
              VALUES (?, ?)`,
        [event_id, attendee_id],
        (err) => {
          if (err) {
            reject({
              status: 500,
              message: "Error adding event attendee in database.",
            });
          } else {
            resolve({ status: 201, event_id, attendee_id });
          }
        }
      );
    });
  }

  async getAttendeeEvents(
    attendee_id: string
  ): Promise<{ status: number; data: EventDetails[] } | NotFound> {
    let eventAttendeeExists = await this.recordExists(
      "events_attendees",
      "attendee_id",
      attendee_id
    );
    return new Promise(async (resolve, reject) => {
      if (eventAttendeeExists) {
        this.db.all(
          "SELECT * FROM events_details WHERE event_id IN (SELECT event_id FROM events_attendees WHERE attendee_id = ?);",
          attendee_id,
          function (err, rows: EventDetails[]) {
            if (err) reject(err);
            if (rows.length > 0) resolve({ status: 200, data: rows });
            else resolve({ status: 404, message: "No events found." });
          }
        );
      } else {
        resolve({ status: 404, message: "No events found." });
      }
    });
  }

  async getAttendeeList(
    event_id: string
  ): Promise<{ status: number; data: EventAttendee[] } | NotFound> {
    let eventExists = await this.recordExists("events", "event_id", event_id);
    return new Promise(async (resolve, reject) => {
      if (eventExists) {
        this.db.all(
          "SELECT * FROM events_attendees WHERE event_id = ?;",
          event_id,
          function (err, rows: EventAttendee[]) {
            if (err) reject(err);
            if (rows.length > 0) resolve({ status: 200, data: rows });
            else resolve({ status: 404, message: "No attendees found." });
          }
        );
      } else {
        resolve({ status: 404, message: "No attendees found." });
      }
    });
  }

  close(): void {
    this.db.close((err) => {
      if (err) {
        console.log("Error closing database:", err);
      } else {
        console.log("Database connection closed.");
      }
    });
  }
}

export default DBController;
