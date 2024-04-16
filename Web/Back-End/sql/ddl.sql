CREATE TABLE IF NOT EXISTS request (
    request_id TEXT PRIMARY KEY,
    unit_id TEXT NOT NULL,
    employee_id TEXT,
    type TEXT CHECK (type IN ("daily_operations", "move_in", "intercom_change", "access", "common_area_report", "question")),
    description TEXT,
    status TEXT CHECK (status IN ("Received", "In progress", "Completed")),
    FOREIGN KEY (unit_id) REFERENCES unit (unit_id),
    FOREIGN KEY (employee_id) REFERENCES employee (employee_id)
);--

CREATE TABLE IF NOT EXISTS property (
    property_id TEXT PRIMARY KEY,
    admin_id TEXT NOT NULL,
    unit_count INTEGER,
    locker_count INTEGER,
    parking_count INTEGER,
    address TEXT,
    picture TEXT,
    FOREIGN KEY (admin_id) REFERENCES CMC_Admin (admin_id)
);--

CREATE TABLE IF NOT EXISTS file (
    file_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    property_id TEXT NOT NULL,
    FOREIGN KEY (property_id) REFERENCES property (property_id)
);--

CREATE TABLE IF NOT EXISTS unit (
    unit_id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL,
    occupant_id TEXT,
    occupant_registration_key TEXT,
    occupant_type TEXT CHECK (occupant_type IN ("owner", "renter")),
    size INTEGER NOT NULL,
    monthly_rent REAL NOT NULL,
    condo_fee REAL NOT NULL,
    condo_balance REAL NOT NULL,
    FOREIGN KEY (property_id) REFERENCES property (property_id),
    FOREIGN KEY (occupant_id) REFERENCES account (account_id)
);--

CREATE TABLE IF NOT EXISTS post (
    post_id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL,
    creator_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    replied_to TEXT,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES property (property_id),
    FOREIGN KEY (creator_id) REFERENCES account (account_id),
    FOREIGN KEY (replied_to) REFERENCES post (post_id)
);--

CREATE TABLE IF NOT EXISTS account (
    account_id TEXT PRIMARY KEY,
    fullname TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    profile_picture BLOB,
    registration_key TEXT,
    account_type TEXT CHECK (account_type IN ("Public", "Owner", "Renter", "Employee", "Admin")) NOT NULL,
    'address' TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);--

CREATE TABLE IF NOT EXISTS employee (
    employee_id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL,
    type TEXT CHECK (type IN ("manager", "accountant", "daily_operator")) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES account (account_id),
    FOREIGN KEY (property_id) REFERENCES property (property_id)
);--

CREATE TRIGGER employee_account_type_constraint
BEFORE INSERT ON employee
WHEN (SELECT account_type FROM account WHERE account_id = NEW.employee_id) != 'Employee'
BEGIN
    SELECT RAISE(ABORT, 'An employee must have an account type of Employee.');
END;--

CREATE TABLE IF NOT EXISTS CMC_Admin (
    admin_id TEXT PRIMARY KEY,
    company_name TEXT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES account (account_id)
);--

CREATE VIEW employee_data AS
    SELECT employee_id, property_id, type, A.fullname, A.email, A.phone_number, A.profile_picture, A.created_at
    FROM employee
    JOIN account A ON employee.employee_id = A.account_id