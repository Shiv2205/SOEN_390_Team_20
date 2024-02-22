-- Sample data for the 'request' table
INSERT INTO request (request_id, staff_id, property_id, type, description, status) VALUES
('1a81b1e8-9e51-4f0e-80a5-6f950d2d7b7e', 101, 201, 'move_in', 'Moving in request', 'Received'),
('2be97b1d-b772-4e8c-8c50-c7a36133d9f1', 102, 202, 'daily_operations', 'Daily operations request', 'Completed'),
('3c665e05-55a9-40ff-b5b2-24dcbe5f75a0', 103, 203, 'intercom_change', 'Intercom change request', 'In progress'),
('4f393bd2-46d2-4f6d-a12e-3b10e06a4c5d', 104, 204, 'common_area_report', 'Common area report request', 'Received'),
('5d7468f7-649f-4b4d-bb19-18e3d6fe3670', 105, 205, 'access', 'Access request', 'In progress'),
('6e5a23c7-81fb-492e-90c5-3b57b7b492a2', 106, 206, 'question', 'Question request', 'Completed'),
('7c4d8107-7c8a-4ff4-bc51-f1762aaf8f70', 107, 207, 'move_in', 'Moving in request', 'Received'),
('8b726430-0c84-4398-8253-dc6896f8d22a', 108, 208, 'access', 'Access request', 'In progress'),
('9f1240b5-4b20-4e59-bad9-1e4189c02e12', 109, 209, 'daily_operations', 'Daily operations request', 'Received'),
('10a06477-ebd3-4a1d-bf3d-503ef83f835d', 110, 210, 'move_in', 'Moving in request', 'Completed');

-- Sample data for the 'property' table
INSERT INTO property (property_id, unit_count, locker_count, parking_count, address, picture) VALUES
('1d2b6c84-2b4c-4893-8fb6-cf76f255d990', 20, 10, 50, '123 Main St', 'main_street.jpg'),
('2e093bf3-f8a3-4f09-ae6b-99a7ab052d4e', 15, 5, 30, '456 Elm St', 'elm_street.jpg'),
('3f8f39f4-df97-46a1-8a6d-0d3129b8f48e', 25, 8, 40, '789 Oak St', 'oak_street.jpg'),
('4a6d935b-9c16-4aa6-8f7c-85937fcf73ad', 18, 6, 35, '101 Pine St', 'pine_street.jpg'),
('5bde3e3e-cdb8-47ec-b14f-cf67b1c1be6e', 22, 12, 45, '321 Maple St', 'maple_street.jpg'),
('6cb6371c-9d43-4dc2-8c4c-d9c17b643a34', 30, 15, 60, '555 Cedar St', 'cedar_street.jpg'),
('7d8b70e5-094d-4b80-bf29-67e6ff8d44da', 17, 7, 25, '777 Walnut St', 'walnut_street.jpg'),
('8e5144a1-24b4-42af-8c92-3d493bf7e169', 12, 4, 20, '999 Birch St', 'birch_street.jpg'),
('9f4a77ae-bd12-4c6a-82c2-72b4f7ab7ff1', 28, 10, 55, '222 Spruce St', 'spruce_street.jpg'),
('10a96f71-fb29-40e2-bce0-81ae65400523', 16, 8, 30, '444 Ash St', 'ash_street.jpg');

-- Sample data for the 'file' table
INSERT INTO file (file_id, title, content, property_id) VALUES
('1c8f3bda-9035-4c8d-8193-c1e16a54db41', 'Document 1', 'File content 1', '1d2b6c84-2b4c-4893-8fb6-cf76f255d990'),
('2d72136a-50e5-4d4d-a075-0977d2c2924b', 'Document 2', 'File content 2', '2e093bf3-f8a3-4f09-ae6b-99a7ab052d4e'),
('3e4f0c6d-26c2-49d2-bf24-7da211e043e7', 'Document 3', 'File content 3', '3f8f39f4-df97-46a1-8a6d-0d3129b8f48e'),
('4f9c570e-1d8e-4a77-b2fc-6b65cd0d42df', 'Document 4', 'File content 4', '4a6d935b-9c16-4aa6-8f7c-85937fcf73ad'),
('5a8d493c-7f5e-48b8-8b63-0ff10bda4ac2', 'Document 5', 'File content 5', '5bde3e3e-cdb8-47ec-b14f-cf67b1c1be6e'),
('6b731509-6f08-40bb-b335-1665c04f37a7', 'Document 6', 'File content 6', '6cb6371c-9d43-4dc2-8c4c-d9c17b643a34'),
('7a27f5b0-8fc3-4658-a35b-9d65021e05ad', 'Document 7', 'File content 7', '7d8b70e5-094d-4b80-bf29-67e6ff8d44da'),
('8e6d2c58-80c8-4541-a7d9-d0627e4e08c1', 'Document 8', 'File content 8', '8e5144a1-24b4-42af-8c92-3d493bf7e169'),
('9f0aeb33-15b2-48bc-836e-2c03714e679f', 'Document 9', 'File content 9', '9f4a77ae-bd12-4c6a-82c2-72b4f7ab7ff1'),
('10b0a429-0d47-4879-9e70-d442f7c2dd79', 'Document 10', 'File content 10', '10a96f71-fb29-40e2-bce0-81ae65400523');

-- Sample data for the 'unit' table
INSERT INTO unit (unit_id, property_id, size, monthly_rent, condo_fee, condo_balance, owner_id, renter_id, owner_registration_key, renter_registration_key) VALUES
('1d91a7cd-893d-4944-9c31-c4c0136f1844', '1d2b6c84-2b4c-4893-8fb6-cf76f255d990', 1000, 1200.00, 150.00, 500.00, 201, 301, 'owner_reg_key_1', 'renter_reg_key_1'),
('2e2e64d7-72f9-4aa6-845b-31eefb0d24ff', '2e093bf3-f8a3-4f09-ae6b-99a7ab052d4e', 850, 1100.00, 120.00, 400.00, 202, 302, 'owner_reg_key_2', 'renter_reg_key_2'),
('3f5ac597-b5eb-4262-885f-f65d91f36cbf', '3f8f39f4-df97-46a1-8a6d-0d3129b8f48e', 1200, 1400.00, 200.00, 600.00, 203, 303, 'owner_reg_key_3', 'renter_reg_key_3'),
('4a1be37d-9778-40e2-9488-0b29f796b17a', '4a6d935b-9c16-4aa6-8f7c-85937fcf73ad', 950, 1250.00, 130.00, 450.00, 204, 304, 'owner_reg_key_4', 'renter_reg_key_4'),
('5b087c71-3e24-47c5-a29d-1431ae201c61', '5bde3e3e-cdb8-47ec-b14f-cf67b1c1be6e', 1100, 1300.00, 180.00, 550.00, 205, 305, 'owner_reg_key_5', 'renter_reg_key_5'),
('6c156579-5b87-49b9-b6cb-3bc5a044c579', '6cb6371c-9d43-4dc2-8c4c-d9c17b643a34', 1050, 1150.00, 160.00, 500.00, 206, 306, 'owner_reg_key_6', 'renter_reg_key_6'),
('7d7d9f0b-8e3b-4145-94ad-5fd306e7e63c', '7d8b70e5-094d-4b80-bf29-67e6ff8d44da', 1150, 1350.00, 190.00, 600.00, 207, 307, 'owner_reg_key_7', 'renter_reg_key_7'),
('8e02068b-c1e1-4a9a-8d19-f15391c9b39c', '8e5144a1-24b4-42af-8c92-3d493bf7e169', 900, 1200.00, 140.00, 450.00, 208, 308, 'owner_reg_key_8', 'renter_reg_key_8'),
('9f20368a-4fd1-4e25-a93b-65e82e6fbf5d', '9f4a77ae-bd12-4c6a-82c2-72b4f7ab7ff1', 1000, 1250.00, 170.00, 500.00, 209, 309, 'owner_reg_key_9', 'renter_reg_key_9'),
('10ae0e09-8db1-4c6d-b235-6e7e56e9f1bf', '10a96f71-fb29-40e2-bce0-81ae65400523', 950, 1300.00, 160.00, 480.00, 210, 310, 'owner_reg_key_10', 'renter_reg_key_10');

-- Sample data for the 'post' table
INSERT INTO post (post_id, property_id, creator_id, content, replied_to, posted_at) VALUES
('1f2b799c-03d3-4db7-b290-c4d8b25e4353', '1d2b6c84-2b4c-4893-8fb6-cf76f255d990', 201, 'Post content 1', NULL, CURRENT_TIMESTAMP),
('2g3e4e45-33c1-4a6b-81ff-43f6a2f75827', '2e093bf3-f8a3-4f09-ae6b-99a7ab052d4e', 202, 'Post content 2', NULL, CURRENT_TIMESTAMP),
('3h4i5f6b-8d79-432a-a2ef-5a9744b77ac1', '3f8f39f4-df97-46a1-8a6d-0d3129b8f48e', 203, 'Post content 3', NULL, CURRENT_TIMESTAMP),
('4j5k6l78-3043-4562-98fc-f492b9869e1c', '4a6d935b-9c16-4aa6-8f7c-85937fcf73ad', 204, 'Post content 4', NULL, CURRENT_TIMESTAMP),
('5m6n7o8p-bf6d-4961-864d-b0b52fc59d27', '5bde3e3e-cdb8-47ec-b14f-cf67b1c1be6e', 205, 'Post content 5', NULL, CURRENT_TIMESTAMP),
('6q7r8s9t-c760-4cb0-b90e-fa1a4d7c1fc6', '6cb6371c-9d43-4dc2-8c4c-d9c17b643a34', 206, 'Post content 6', NULL, CURRENT_TIMESTAMP),
('7u8v9w0x-dba8-41a7-b1c4-85e446d6fe0b', '7d8b70e5-094d-4b80-bf29-67e6ff8d44da', 207, 'Post content 7', NULL, CURRENT_TIMESTAMP),
('8y9z0aa1-5b9e-4346-8a49-392a49e31c69', '8e5144a1-24b4-42af-8c92-3d493bf7e169', 208, 'Post content 8', NULL, CURRENT_TIMESTAMP),
('9abbc11a-1861-47e3-86fc-2c4e1a589f78', '9f4a77ae-bd12-4c6a-82c2-72b4f7ab7ff1', 209, 'Post content 9', NULL, CURRENT_TIMESTAMP),
('10cdde12-7b70-4854-9e5b-c69c5e3a14f2', '10a96f71-fb29-40e2-bce0-81ae65400523', 210, 'Post content 10', NULL, CURRENT_TIMESTAMP);

-- Sample data for the 'account' table
INSERT INTO account (account_id, fullname, password, email, phone_number, profile_picture, registration_key, account_type, created_at)
VALUES
('1d389ee6-41c2-4b7e-b0c2-4b241d7d3cf4', 'John Doe', 'password1', 'john@example.com', '1234567890', 'https://randomuser.me/api/portraits/men/1.jpg', 'reg_key_1', 'Employee', CURRENT_TIMESTAMP),
('2e4973c4-efb1-42c4-b6b9-00cb914f6a8c', 'Jane Smith', 'password2', 'jane@example.com', '9876543210', 'https://randomuser.me/api/portraits/women/1.jpg', 'reg_key_2', 'Employee', CURRENT_TIMESTAMP),
('3f5a2f8d-278b-49f0-9e29-25f8c0f36e5f', 'Alice Johnson', 'password3', 'alice@example.com', '4561237890', 'https://randomuser.me/api/portraits/women/2.jpg', 'reg_key_3', 'Owner', CURRENT_TIMESTAMP),
('4a6b26d9-d642-4521-a938-f0d8f4aeb079', 'Bob Brown', 'password4', 'bob@example.com', '7894561230', 'https://randomuser.me/api/portraits/men/2.jpg', 'reg_key_4', 'Renter', CURRENT_TIMESTAMP),
('5c7d56a2-89a2-456f-9b4d-6397a98255fc', 'Emily Davis', 'password5', 'emily@example.com', '3216549870', 'https://randomuser.me/api/portraits/women/3.jpg', 'reg_key_5', 'Employee', CURRENT_TIMESTAMP),
('6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9', 'Michael Wilson', 'password6', 'michael@example.com', '6543217890', 'https://randomuser.me/api/portraits/men/3.jpg', 'reg_key_6', 'Renter', CURRENT_TIMESTAMP),
('7f9a7c4e-6c6f-47a2-b74c-ea6d5d27eb4a', 'Sarah Taylor', 'password7', 'sarah@example.com', '1237894560', 'https://randomuser.me/api/portraits/women/4.jpg', 'reg_key_7', 'Owner', CURRENT_TIMESTAMP),
('8a1b4e0f-c927-4811-8e1e-bc5256423b2d', 'David Martinez', 'password8', 'david@example.com', '7891236540', 'https://randomuser.me/api/portraits/men/4.jpg', 'reg_key_8', 'Public', CURRENT_TIMESTAMP),
('9c3d2e5a-ee47-4f2a-b47d-1c6932a05f7e', 'Olivia Hernandez', 'password9', 'olivia@example.com', '4567891230', 'https://randomuser.me/api/portraits/women/5.jpg', 'reg_key_9', 'Owner', CURRENT_TIMESTAMP),
('10e6d4f0-8476-431b-b39a-5e35e2a1b1db', 'James Nguyen', 'password10', 'james@example.com', '9876543210', 'https://randomuser.me/api/portraits/men/5.jpg', 'reg_key_10', 'Employee', CURRENT_TIMESTAMP),
('11f8a2b3-9c1d-4630-81f1-345a1f123456', 'Laura Johnson', 'password11', 'laura@example.com', '1234567890', 'https://randomuser.me/api/portraits/women/6.jpg', 'reg_key_11', 'Owner', CURRENT_TIMESTAMP),
('12g9c4d5-e3a2-41b6-b78e-456d3c1a2345', 'William Brown', 'password12', 'william@example.com', '9876543210', 'https://randomuser.me/api/portraits/men/6.jpg', 'reg_key_12', 'Renter', CURRENT_TIMESTAMP),
('13h7e2f8-g4a6-48d3-c92b-567e1a567890', 'Mia Wilson', 'password13', 'mia@example.com', '6543217890', 'https://randomuser.me/api/portraits/women/7.jpg', 'reg_key_13', 'Public', CURRENT_TIMESTAMP),
('14i6f3e2-b5d4-49a2-b38a-678d2b678901', 'Noah Taylor', 'password14', 'noah@example.com', '1237894560', 'https://randomuser.me/api/portraits/men/7.jpg', 'reg_key_14', 'Employee', CURRENT_TIMESTAMP),
('15j5g2h1-c4b3-42d1-a92c-789e1c789012', 'Ava Martinez', 'password15', 'ava@example.com', '7891236540', 'https://randomuser.me/api/portraits/women/8.jpg', 'reg_key_15', 'Owner', CURRENT_TIMESTAMP),
('16k4f1i9-d3c2-4a1b-e1f3-890d1b890123', 'Liam Garcia', 'password16', 'liam@example.com', '4567891230', 'https://randomuser.me/api/portraits/men/8.jpg', 'reg_key_16', 'Renter', CURRENT_TIMESTAMP),
('17l3h2g4-e1f5-4d2c-b3a9-901c2d901234', 'Isabella Hernandez', 'password17', 'isabella@example.com', '9876543210', 'https://randomuser.me/api/portraits/women/9.jpg', 'reg_key_17', 'Public', CURRENT_TIMESTAMP),
('18m2j1i0-f9e8-4c7b-a6d5-012d3e012345', 'Ethan Nguyen', 'password18', 'ethan@example.com', '1234567890', 'https://randomuser.me/api/portraits/men/9.jpg', 'reg_key_18', 'Employee', CURRENT_TIMESTAMP),
('19n1k0m2-g8h7-4b6c-d5e4-123e4f123456', 'Sophia Brown', 'password19', 'sophia@example.com', '9876543210', 'https://randomuser.me/api/portraits/women/10.jpg', 'reg_key_19', 'Owner', CURRENT_TIMESTAMP),
('20o9l8m7-h6g5-4f3e-c2d1-234f5g234567', 'Alexander Taylor', 'password20', 'alexander@example.com', '6543217890', 'https://randomuser.me/api/portraits/men/10.jpg', 'reg_key_20', 'Renter', CURRENT_TIMESTAMP);

-- Sample data for the 'employee' table
INSERT INTO employee (employee_id, type) VALUES
('1d389ee6-41c2-4b7e-b0c2-4b241d7d3cf4', 'admin'),
('2e4973c4-efb1-42c4-b6b9-00cb914f6a8c', 'manager'),
('5c7d56a2-89a2-456f-9b4d-6397a98255fc', 'admin'),
('10e6d4f0-8476-431b-b39a-5e35e2a1b1db', 'manager'),
('14i6f3e2-b5d4-49a2-b38a-678d2b678901', 'daily_operator'),
('18m2j1i0-f9e8-4c7b-a6d5-012d3e012345', 'daily_operator');

-- Sample data for the 'work_at' table
INSERT INTO work_at (employee_id, property_id) VALUES
('1d389ee6-41c2-4b7e-b0c2-4b241d7d3cf4', '1d2b6c84-2b4c-4893-8fb6-cf76f255d990'),
('2e4973c4-efb1-42c4-b6b9-00cb914f6a8c', '2e093bf3-f8a3-4f09-ae6b-99a7ab052d4e'),
('3f5a2f8d-278b-49f0-9e29-25f8c0f36e5f', '3f8f39f4-df97-46a1-8a6d-0d3129b8f48e'),
('4a6b26d9-d642-4521-a938-f0d8f4aeb079', '4a6d935b-9c16-4aa6-8f7c-85937fcf73ad'),
('5c7d56a2-89a2-456f-9b4d-6397a98255fc', '5bde3e3e-cdb8-47ec-b14f-cf67b1c1be6e'),
('6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9', '6cb6371c-9d43-4dc2-8c4c-d9c17b643a34'),
('7f9a7c4e-6c6f-47a2-b74c-ea6d5d27eb4a', '7d8b70e5-094d-4b80-bf29-67e6ff8d44da'),
('8a1b4e0f-c927-4811-8e1e-bc5256423b2d', '8e5144a1-24b4-42af-8c92-3d493bf7e169'),
('9c3d2e5a-ee47-4f2a-b47d-1c6932a05f7e', '9f4a77ae-bd12-4c6a-82c2-72b4f7ab7ff1'),
('10e6d4f0-8476-431b-b39a-5e35e2a1b1db', '10a96f71-fb29-40e2-bce0-81ae65400523');
