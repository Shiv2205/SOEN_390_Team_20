"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = __importStar(require("sqlite3"));
const fs = __importStar(require("fs"));
const uuid = __importStar(require("uuid"));
const path = __importStar(require("path"));
const currentDB = "test_data.txt"; // test_data.txt
const ddlPath = path.join(process.cwd(), "/sql/ddl.sql");
const testData = path.join(process.cwd(), "/sql/populate.sql");
const currentDBPath = path.join(process.cwd(), `/data/${currentDB}`);
class DBController {
    constructor(DBPath = currentDBPath) {
        this.db = new sqlite3.Database(DBPath);
        this.initialize(DBPath);
    }
    initialize(DBPath = currentDBPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.stat(currentDBPath, (err, stats) => {
                    if (err) {
                        console.log("Database does not exist");
                        this.db.serialize(() => {
                            let ddl = fs.readFileSync(ddlPath, "utf8");
                            let tables = ddl.split(";--");
                            tables.map((createTable) => {
                                if (createTable)
                                    this.db.run(createTable.trim() + ";"); // DDL to create table
                            });
                        });
                        resolve({ init: "Database initialized" });
                    }
                    else {
                        resolve({ init: "Database ready" });
                    }
                });
            });
        });
    }
    populate() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.stat(currentDBPath, (err, stats) => {
                    if (!err) {
                        console.log("Database ready");
                        this.db = new sqlite3.Database(currentDBPath);
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
                    }
                    else {
                        reject({ populate: "Database does not exist" });
                    }
                });
            });
        });
    }
    recordExists(table_name, id_column_name, record_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.get(`SELECT COUNT(*) AS count FROM ${table_name} WHERE ${id_column_name} = $record_id`, { $record_id: record_id }, function (err, row) {
                    if (row.count > 0)
                        resolve(true);
                    else
                        resolve(false);
                });
            });
        });
    }
    createNewPublicUser({ fullname, email, password, phoneNumber = null, profilePicture = null, account_type = "Public", }) {
        return __awaiter(this, void 0, void 0, function* () {
            let existingUser = yield this.recordExists("account", "email", email);
            return new Promise((resolve, reject) => {
                if (!existingUser) {
                    let account_id = uuid.v4();
                    this.db.run("INSERT INTO account (account_id, fullname, password, email, phone_number, profile_picture, account_type) VALUES (?, ?, ?, ?, ?, ?, ?)", [
                        account_id,
                        fullname,
                        password,
                        email,
                        phoneNumber,
                        profilePicture,
                        account_type,
                    ]);
                    resolve({ status: 201, account_id: account_id });
                }
                resolve({ status: 400, message: "User already resgistered!" });
            });
        });
    }
    getPublicUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let existingUser = yield this.recordExists("account", "email", email);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (existingUser) {
                    this.db.get(`SELECT 
                    account_id,
                    fullname,
                    email,
                    phone_number,
                    profile_picture,
                    account_type 
                    FROM account 
                    WHERE email = ? AND password = ?`, [email, password], function (err, row) {
                        if (row)
                            resolve({ status: 202, data: row });
                        if (err)
                            reject(err);
                    });
                }
                else {
                    resolve({ status: 400, message: "User does not have an account." });
                }
            }));
        });
    }
    createNewEmployee({ fullname, email, password, property_id = null, type, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let userExists = yield this.recordExists("account", "email", email);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (!userExists) {
                    let employee_id = (yield this.createNewPublicUser({
                        fullname,
                        email,
                        password,
                        account_type: "Employee",
                    })).account_id;
                    this.db.run("INSERT INTO employee (employee_id, property_id, type) VALUES (?, ?, ?)", [employee_id, property_id, type]);
                    resolve({ status: 201, employee_id: employee_id });
                }
                else {
                    let existingUser = yield this.getPublicUser(email, password);
                    let account_id = existingUser.data.account_id;
                    this.db.run("INSERT INTO employee (employee_id, property_id, type) VALUES (?, ?, ?)", [account_id, property_id, type]);
                    resolve({ status: 201, employee_id: account_id });
                }
            }));
        });
    }
    getEmployee(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let existingUser = yield this.recordExists("employee_data", "email", email);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (existingUser) {
                    this.db.get("SELECT * FROM employee_data WHERE email = ? AND password = ?", [email, password], function (err, row) {
                        if (row)
                            resolve({ status: 202, data: row });
                        if (err)
                            reject(err);
                    });
                }
                else {
                    reject({ status: 400, message: "User does not have an account." });
                }
            }));
        });
    }
    getAllEmployees(property_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let propertyExists = yield this.recordExists("property", "property_id", property_id);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (propertyExists) {
                    this.db.all(`SELECT E.*
                    FROM employee_data E 
                    JOIN work_at W ON E.employee_id = W.employee_id
                    WHERE W.property_id = ?;`, property_id, function (err, rows) {
                        if (err)
                            reject(err);
                        if (rows.length > 0)
                            resolve({ status: 200, data: rows });
                    });
                }
                else {
                    resolve({
                        status: 204,
                        message: "No employees found for given property",
                    });
                }
            }));
        });
    }
    createNewProperty({ unit_count, parking_count, locker_count, address, picture = "", }) {
        return __awaiter(this, void 0, void 0, function* () {
            let propertyExists = yield this.recordExists("property", "address", address);
            return new Promise((resolve, reject) => {
                if (!propertyExists) {
                    let property_id = uuid.v4();
                    this.db.run("INSERT INTO property (property_id, unit_count, parking_count, locker_count, address, picture) VALUES (?, ?, ?, ?, ?, ?)", [
                        property_id,
                        unit_count,
                        parking_count,
                        locker_count,
                        address,
                        picture,
                    ]);
                    resolve({ status: 201, property_id: property_id });
                }
                reject({ status: 400, message: "Property already exists!" });
            });
        });
    }
    getProperty(property_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let propertyExists = yield this.recordExists("property", "property_id", property_id);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (propertyExists) {
                    this.db.get("SELECT * FROM property WHERE property_id = ?;", property_id, function (err, row) {
                        if (row)
                            resolve({ status: 202, data: row });
                        if (err)
                            reject(err);
                    });
                }
                else {
                    reject({
                        status: 400,
                        message: "Property does not exist in database.",
                    });
                }
            }));
        });
    }
    getAllProperties(employee_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let employeeExists = yield this.recordExists("employee", "employee_id", employee_id);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (employeeExists) {
                    this.db.all(`SELECT P.*
                    FROM property P
                    WHERE P.property_id IN 
                    (SELECT W.property_id
                    FROM work_at W
                    JOIN employee E ON E.employee_id = W.employee_id
                    AND E.employee_id = ?);`, [employee_id], function (err, rows) {
                        if (err)
                            reject(err);
                        if (rows) {
                            if (rows.length > 0)
                                resolve({ status: 200, data: rows });
                        }
                    });
                }
                else {
                    resolve({
                        status: 204,
                        message: "No properties found for given employee",
                    });
                }
            }));
        });
    }
    createNewUnit({ property_id, size, monthly_rent, condo_fee, condo_balance, owner_id = "", renter_id = "", owner_registration_key = "", renter_registration_key = "", }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let unit_id = uuid.v4();
                this.db.run(`INSERT INTO unit 
                (unit_id, property_id, size, monthly_rent, condo_fee, condo_balance, owner_id, 
                renter_id, owner_registration_key, renter_registration_key) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
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
                ]);
                resolve({ status: 201, unit_id: unit_id });
            });
        });
    }
    getUnit(unit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let unitExists = yield this.recordExists("unit", "unit_id", unit_id);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (unitExists) {
                    this.db.get(`SELECT 
                    unit_id,
                    property_id,
                    size,
                    monthly_rent,
                    condo_fee,
                    condo_balance,
                    owner_id,
                    renter_id 
                    FROM unit WHERE unit_id = ?;`, unit_id, function (err, row) {
                        if (row)
                            resolve({ status: 202, data: row });
                        if (err)
                            reject(err);
                    });
                }
                else {
                    reject({
                        status: 400,
                        message: "Unit does not exist in database.",
                    });
                }
            }));
        });
    }
    getAllUnits(property_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let unitExists = yield this.recordExists("unit", "property_id", property_id);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (unitExists) {
                    this.db.all(`SELECT 
                    unit_id,
                    property_id,
                    size,
                    monthly_rent,
                    condo_fee,
                    condo_balance,
                    owner_id,
                    renter_id 
                    FROM unit 
                    WHERE property_id = ?;`, property_id, function (err, rows) {
                        if (err)
                            reject(err);
                        if (rows)
                            if (rows.length > 0)
                                resolve({ status: 200, data: rows });
                    });
                }
                else {
                    resolve({
                        status: 204,
                        message: "Property does not have any units in database.",
                    });
                }
            }));
        });
    }
    createNewPost({ property_id, creator_id, content, replied_to = "", }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let post_id = uuid.v4();
                this.db.run(`INSERT INTO post 
                (post_id, property_id, creator_id, content, replied_to) 
                VALUES (?, ?, ?, ?, ?)`, [post_id, property_id, creator_id, content, replied_to]);
                resolve({ status: 201, post_id: post_id });
            });
        });
    }
    getAllUserPosts(creator_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let postsExists = yield this.recordExists("post", "creator_id", creator_id);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (postsExists) {
                    this.db.all("SELECT * FROM post WHERE creator_id = ?;", creator_id, function (err, rows) {
                        if (err)
                            reject(err);
                        if (rows)
                            if (rows.length > 0)
                                resolve({ status: 200, data: rows });
                    });
                }
                else {
                    resolve({
                        status: 204,
                        message: "User has no posts in database.",
                    });
                }
            }));
        });
    }
    getAllPostsReplies(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let postsExists = yield this.recordExists("post", "post_id", post_id);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (postsExists) {
                    this.db.all("SELECT * FROM post WHERE replied_to = ?;", post_id, function (err, rows) {
                        if (err)
                            reject(err);
                        if (rows)
                            if (rows.length > 0)
                                resolve({ status: 200, data: rows });
                    });
                }
                else {
                    resolve({
                        status: 204,
                        message: "No replies for this post in database.",
                    });
                }
            }));
        });
    }
    getAllPropertyPosts(property_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let postsExists = yield this.recordExists("post", "property_id", property_id);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (postsExists) {
                    this.db.all("SELECT * FROM post WHERE property_id = ?;", property_id, function (err, rows) {
                        if (err)
                            reject(err);
                        if (rows.length > 0)
                            resolve({ status: 200, data: rows });
                    });
                }
                else {
                    resolve({
                        status: 204,
                        message: "Property has no posts in database.",
                    });
                }
            }));
        });
    }
    close() {
        this.db.close((err) => {
            if (err) {
                console.log("Error closing database:", err);
            }
            else {
                console.log("Database connection closed.");
            }
        });
    }
}
exports.default = DBController;
