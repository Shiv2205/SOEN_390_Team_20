-- Dummy data for the "request" table
INSERT INTO request (request_id, unit_id, employee_id, type, description, status) VALUES
    ('8d95c41e-96cb-4d8b-bf64-40ffed7f88d5', '43cc3d25-5297-4a5e-8b23-7dc246042cb2', '6c46f50a-4e6e-4d75-bd23-74c6ed7e0f52', 'daily_operations', 'Fixing broken intercom', 'Completed'),
    ('b90c066a-3c54-4c20-9f0d-1aa77d73a7e0', '9f401f02-89da-47a3-b79d-9534d7c36b90', 'cb29c3c8-936d-4a67-9c0a-2902349c07f7', 'move_in', 'New tenant moving in', 'In progress'),
    ('e67a739d-56b0-4c9b-b4b8-201f78c0cb5c', '43cc3d25-5297-4a5e-8b23-7dc246042cb2', 'f25d45e1-f4b6-40d3-aae5-7781ffefb57e', 'access', 'Issue with access card', 'Received'),
    ('9fd7c4d5-fcb5-44c8-a1b3-460f2fc83ed2', '851ae35e-648b-4487-bdc3-d2ec8333bc40', '6c46f50a-4e6e-4d75-bd23-74c6ed7e0f52', 'common_area_report', 'Report of damaged elevator', 'In progress'),
    ('12d4fe96-7556-49cc-848f-b8cf0c8f1402', '9cf98c1d-6766-4d5c-80a7-d0f601460e61', 'cb29c3c8-936d-4a67-9c0a-2902349c07f7', 'question', 'Inquiry about parking allocation', 'Received');

-- Dummy data for the "property" table
INSERT INTO property (property_id, admin_id, unit_count, locker_count, parking_count, address, picture) VALUES
    ('25e44531-6e47-4c70-a488-8f0c08e48c50', '782d35a7-c31f-4d42-8e39-5cc2c774f9e7', 50, 20, 100, '123 Main St', 'https://example.com/picture1.jpg'),
    ('61d0c979-8e84-4c71-8b7a-bd306f261fe5', '8767b2cc-951f-4329-89af-fbb062d5e6a2', 30, 10, 50, '456 Elm St', 'https://example.com/picture2.jpg'),
    ('5b12f7f4-29e1-4e3c-92b7-45ee7b61d784', '782d35a7-c31f-4d42-8e39-5cc2c774f9e7', 40, 15, 75, '789 Oak St', 'https://example.com/picture3.jpg'),
    ('91df8580-912d-48d3-9e42-2b238aee3b22', '8767b2cc-951f-4329-89af-fbb062d5e6a2', 60, 25, 120, '101 Pine St', 'https://example.com/picture4.jpg'),
    ('2faa684a-bf1c-4b92-a56d-77a4a5a4b278', '782d35a7-c31f-4d42-8e39-5cc2c774f9e7', 35, 12, 60, '222 Cedar St', 'https://example.com/picture5.jpg');

-- Dummy data for the "file" table
INSERT INTO file (file_id, title, content, property_id) VALUES
    ('d961b37e-5868-4c38-ba0c-8c250bc30ff3', 'Rules and Regulations', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '25e44531-6e47-4c70-a488-8f0c08e48c50'),
    ('c1cf7359-f16d-46c6-9370-956a14720232', 'Welcome Packet', 'Welcome to our community! Here is some important information for new residents.', '61d0c979-8e84-4c71-8b7a-bd306f261fe5'),
    ('8e8bfae1-6856-4567-97a3-b12b88ee40ac', 'Maintenance Schedule', 'This document outlines the schedule for routine maintenance tasks in the property.', '5b12f7f4-29e1-4e3c-92b7-45ee7b61d784'),
    ('36be0f39-0d8a-4021-8035-df1f7b5fded0', 'Emergency Contacts', 'List of emergency contacts for residents to refer to in case of emergencies.', '91df8580-912d-48d3-9e42-2b238aee3b22'),
    ('e1a8f20c-1c81-466b-9211-bc6b1cc19253', 'Community Events Calendar', 'Stay updated on upcoming events and activities in the community!', '2faa684a-bf1c-4b92-a56d-77a4a5a4b278');

-- Dummy data for the "unit" table
INSERT INTO unit (unit_id, property_id, occupant_id, occupant_registration_key, occupant_type, size, monthly_rent, condo_fee, condo_balance) VALUES
    ('43cc3d25-5297-4a5e-8b23-7dc246042cb2', '25e44531-6e47-4c70-a488-8f0c08e48c50', NULL, NULL, 'owner', 1000, 1200.00, 300.00, 0.00),
    ('9f401f02-89da-47a3-b79d-9534d7c36b90', '61d0c979-8e84-4c71-8b7a-bd306f261fe5', NULL, NULL, 'renter', 800, 900.00, 200.00, 0.00),
    ('fe524cd1-1ad3-47de-929d-8a49b20033a2', '5b12f7f4-29e1-4e3c-92b7-45ee7b61d784', NULL, NULL, 'owner', 1200, 1500.00, 350.00, 0.00),
    ('9cf98c1d-6766-4d5c-80a7-d0f601460e61', '91df8580-912d-48d3-9e42-2b238aee3b22', NULL, NULL, 'renter', 900, 1000.00, 250.00, 0.00),
    ('851ae35e-648b-4487-bdc3-d2ec8333bc40', '2faa684a-bf1c-4b92-a56d-77a4a5a4b278', NULL, NULL, 'owner', 950, 1300.00, 320.00, 0.00);

-- Dummy data for the "post" table
INSERT INTO post (post_id, property_id, creator_id, content, replied_to) VALUES
    ('b0793701-1f24-4d2a-a9f0-91463d83a7b2', '25e44531-6e47-4c70-a488-8f0c08e48c50', 'f41f13cf-9434-47a0-b01e-4e4b8d4d746e', 'Reminder: Maintenance scheduled for tomorrow.', NULL),
    ('a7eb80eb-4f94-426f-b6bb-624063d38fd4', '61d0c979-8e84-4c71-8b7a-bd306f261fe5', '2e7fbd21-9fd8-4c3f-b5a4-6e7736e29e30', 'Community BBQ this Saturday! Dont miss out!', NULL),
    ('f738ebfd-871e-420b-8ab8-3fd5a445a04d', '5b12f7f4-29e1-4e3c-92b7-45ee7b61d784', 'e319c0b2-f4cd-4f58-a306-b0b0f8050713', 'Anyone interested in forming a book club?', NULL),
    ('e5787a82-2b07-43f8-b8d4-68916e74e27e', '91df8580-912d-48d3-9e42-2b238aee3b22', 'd595b7eb-f5c2-4d30-a635-39b4d61c437b', 'Reminder: Rent due by end of the month.', NULL),
    ('f192146a-2079-4380-8a9e-7a04d01a3775', '2faa684a-bf1c-4b92-a56d-77a4a5a4b278', '2e7fbd21-9fd8-4c3f-b5a4-6e7736e29e30', 'Lost and found: A set of keys was found at the entrance.', NULL);

-- Dummy data for the "account" table
INSERT INTO account (account_id, fullname, password, email, phone_number, profile_picture, registration_key, account_type) VALUES
    ('f41f13cf-9434-47a0-b01e-4e4b8d4d746e', 'John Doe', 'password1', 'john@example.com', '+1234567890', 'https://example.com/john.jpg', NULL, 'Owner', '123 Main Street, Springfield, IL 62701, USA'),
    ('2e7fbd21-9fd8-4c3f-b5a4-6e7736e29e30', 'Jane Smith', 'password2', 'jane@example.com', '+1987654321', 'https://example.com/jane.jpg', NULL, 'Renter', '456 Elm Street, Anytown, TX 12345, USA'),
    ('e319c0b2-f4cd-4f58-a306-b0b0f8050713', 'Alice Johnson', 'password3', 'alice@example.com', NULL, NULL, NULL, 'Public', '789 Oak Avenue, Smallville, CA 98765, USA'),
    ('d595b7eb-f5c2-4d30-a635-39b4d61c437b', 'Bob Brown', 'password4', 'bob@example.com', NULL, NULL, NULL, 'Renter', '321 Pine Road, Big City, NY 54321, USA'),
    ('6c46f50a-4e6e-4d75-bd23-74c6ed7e0f52', 'Emily Wilson', 'password5', 'emily@example.com', NULL, NULL, NULL, 'Employee', '567 Maple Lane, Sunnydale, FL 13579, USA');

-- Dummy data for the "employee" table
INSERT INTO employee (employee_id, property_id, type) VALUES
    ('6c46f50a-4e6e-4d75-bd23-74c6ed7e0f52', '25e44531-6e47-4c70-a488-8f0c08e48c50', 'manager'),
    ('cb29c3c8-936d-4a67-9c0a-2902349c07f7', '61d0c979-8e84-4c71-8b7a-bd306f261fe5', 'accountant'),
    ('f25d45e1-f4b6-40d3-aae5-7781ffefb57e', '5b12f7f4-29e1-4e3c-92b7-45ee7b61d784', 'daily_operator'),
    ('e58e1180-dc50-4cb8-89fd-93f78115793f', '91df8580-912d-48d3-9e42-2b238aee3b22', 'manager'),
    ('26b49e6f-f1f3-47b8-ae57-3a9264a92e67', '2faa684a-bf1c-4b92-a56d-77a4a5a4b278', 'daily_operator');


-- Dummy data for the "CMC_Admin" table
INSERT INTO CMC_Admin (admin_id, company_name) VALUES
    ('782d35a7-c31f-4d42-8e39-5cc2c774f9e7', 'ABC Property Management'),
    ('8767b2cc-951f-4329-89af-fbb062d5e6a2', 'XYZ Management Services');

