CREATE TABLE IF NOT EXISTS request (
    request_id TEXT PRIMARY KEY,
    staff_id INTEGER,
    property_id INTEGER NOT NULL,
    type TEXT CHECK (type IN ("daily_operations", "move_in", "intercom_change", "access", "common_area_report", "question")),
    description TEXT,
    FOREIGN KEY (staff_id) REFERENCES employee (employee_id),
    FOREIGN KEY (property_id) REFERENCES property (property_id)
);

CREATE TABLE IF NOT EXISTS property (
    property_id TEXT PRIMARY KEY,
    unit_count INTEGER,
    locker_count INTEGER,
    parking_count INTEGER,
    address TEXT,
    picture TEXT
);

CREATE TABLE IF NOT EXISTS file (
    file_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    property_id TEXT NOT NULL,
    FOREIGN KEY (property_id) REFERENCES property (property_id)
);

CREATE TABLE IF NOT EXISTS unit (
    unit_id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL,
    size INTEGER,
    condo_fee REAL,
    owner_id INTEGER,
    occupant_id INTEGER,
    owner_registration_key TEXT,
    occupant_registration_key TEXT,
    FOREIGN KEY (property_id) REFERENCES property (property_id),
    FOREIGN KEY (owner_id) REFERENCES account (account_id),
    FOREIGN KEY (occupant_id) REFERENCES account (account_id)
);

CREATE TABLE IF NOT EXISTS post (
    post_id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL,
    creator_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    replied_to TEXT,
    posted_at TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES property (property_id),
    FOREIGN KEY (creator_id) REFERENCES account (account_id),
    FOREIGN KEY (replied_to) REFERENCES post (post_id)
);

CREATE TABLE IF NOT EXISTS account (
    account_id TEXT PRIMARY KEY,
    fullname TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT,
    profile_picture TEXT,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee (
    employee_id TEXT PRIMARY KEY,
    property_id TEXT,
    type TEXT CHECK (type IN ("admin", "manager", "accountant", "daily_operator")),
    FOREIGN KEY (property_id) REFERENCES property (property_id),
    FOREIGN KEY (employee_id) REFERENCES account (account_id)
);


