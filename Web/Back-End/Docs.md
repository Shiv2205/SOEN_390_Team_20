# API Documentation

---

## Accounts Route (/accounts)

### 1. /register
>
>API route handler for user registration.
>
>- **Request:**
>>  - `req` - Request object containing user registration data
>>  - `res` - Response object
>>  - `next` - Next function for error handling
>
>- **Response:**
>>  - A Promise that resolves to an object with registration status or rejects with an error.
>
>Returned object structure:
>
>>```json
>>{
>>  "status": number,
>>  "account_id": string,
>>  "message": string
>>}
>>```

### 2. /users

>API route handler for retrieving user details.
>
>- **Request:**
>>  - `req` - Request object containing user credentials (email and password)
>>  - `res` - Response object
>>  - `next` - Next function for error handling
>
>- **Response:**
>>  - A Promise that resolves to an object with user details or rejects with an error.
>
>Returned object structure:
>
>>```json
>>{
>>  "status": number,
>>  "data": {
>>    "account_id": string,
>>    "account_type": string,
>>    "fullname": string,
>>    "email": string,
>>    "phone_number": string,
>>    "profile_picture": string
>>  },
>>  "message": string
>>}
>>```

### 3. /register/employee

>>API route handler for registering a new employee.
>>
>>- **Request:**
>>>  - `req` - Request object containing employee data
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with the status of the registration operation, employee ID, and optional message.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "employee_id": string,
>>>  "message": string
>>>}
>>>```

### 4. /employees

>>API route handler that retrieves employee details based on provided credentials.
>>
>>- **Request:**
>>>  - `req` - Request object with user credentials in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with employee details or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "data": {
>>>    "employee_id": string,
>>>    "fullname": string,
>>>    "email": string,
>>>    "property_id": string | null,
>>>    "type": "manager" | "accountant" | "daily_operator",
>>>    "phone_number": string,
>>>    "profile_picture": string
>>>  },
>>>  "message": string
>>>}
>>>```

### 5. /employees/property-agents

>>API route handler that retrieves property agents (employees) associated with a specific property.
>>
>>- **Request:**
>>>  - `req` - Request object with property ID in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with property agents' details or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "data": [
>>>    {
>>>      "employee_id": string,
>>>      "fullname": string,
>>>      "email": string,
>>>      "property_id": string | null,
>>>      "type": "manager" | "accountant" | "daily_operator",
>>>      "phone_number": string,
>>>      "profile_picture": string
>>>    }
>>>  ],
>>>  "message": string
>>>}
>>>```

---

## Properties Route (/properties)

### 1. /register

>API route handler that registers a new property.
>
>- **Request:**
>>  - `req` - Request object with new property data in body
>>  - `res` - Response object
>>  - `next` - Next function for error handling
>
>- **Response:**
>>  - A Promise that resolves to an object with result status or rejects with an error.
>
>Returned object structure:
>
>>```json
>>{
>>  "status": number,
>>  "property_id": string
>>}
>>```

### 2. /real-estate

>>API route handler that retrieves details for a property by property ID.
>>
>>- **Request:**
>>>  - `req` - Request object with property ID in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with property details or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "data": {
>>>    "property_id": string,
>>>    "admin_id": string,
>>>    "unit_count": number,
>>>    "parking_count": number,
>>>    "locker_count": number,
>>>    "address": string,
>>>    "picture": string
>>>  },
>>>  "message": string
>>>}
>>>```

### 3. /real-estate/company-assets

>>API route handler that retrieves assets (properties) associated with a real estate company by admin ID.
>>
>>- **Request:**
>>>  - `req` - Request object with admin ID in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with company properties or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "data": [
>>>    {
>>>      "property_id": string,
>>>      "admin_id": string,
>>>      "unit_count": number,
>>>      "parking_count": number,
>>>      "locker_count": number,
>>>      "address": string,
>>>      "picture": string
>>>    }
>>>  ],
>>>  "message": string
>>>}
>>>```

---

## Units (nested) Route (/properties/units)

### 1. /register

>>API route handler that registers a new unit.
>>
>>- **Request:**
>>>  - `req` - Request object with UnitData in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with status and result of registerUnit() call.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "unit_id": string
>>>}
>>>```

### 2. /get-unit

>>API route handler that retrieves details for a unit by ID.
>>
>>- **Request:**
>>>  - `req` - Request object with unit ID in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with unit details or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "data": {
>>>    "unit_id": string,
>>>    "property_id": string,
>>>    "size": number,
>>>    "monthly_rent": number,
>>>    "condo_fee": number,
>>>    "condo_balance": number
>>>  },
>>>  "message": string
>>>}
>>>```

### 3. /get-user-unit

>>API route handler that retrieves details for a unit associated with a user by occupant ID.
>>
>>- **Request:**
>>>  - `req` - Request object with occupant ID in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with unit details or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json                  
>>>{                    
>>>  "status": number,
>>>  "data": {              
>>>    "unit_id": string,
>>>    "property_id": string,
>>>    "size": number,
>>>    "monthly_rent": number,
>>>    "condo_fee": number,
>>>    "condo_balance": number
>>>  },             
>>>  "message": string
>>>}                
>>>```

### 4. /property-assets

>>API route handler that retrieves assets (units) associated with a property by property ID.
>>
>>- **Request:**
>>>  - `req` - Request object with property ID in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with property units or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "data": [
>>>    {
>>>      "unit_id": string,
>>>      "property_id": string,
>>>      "size": number,
>>>      "monthly_rent": number,
>>>      "condo_fee": number,
>>>      "condo_balance": number
>>>    }
>>>  ],
>>>  "message": string
>>>}
>>>```

---

## Posts (nested) Route (properties/posts)

### 1. /create

>>API route handler that creates a new post in the database.
>>
>>- **Request:**
>>>  - `req` - Request object containing post data
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with the status of the post creation operation or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "post_id": string,
>>>  "message": string
>>>}
>>>```

### 2. /user-posts

>>API route handler that retrieves all posts created by a specific user.
>>
>>- **Request:**
>>>  - `req` - Request object containing creator ID in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with user posts or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "data": [
>>>    {
>>>      "post_id": string,
>>>      "property_id": string,
>>>      "creator_id": string,
>>>      "content": string,
>>>      "replied_to": string,
>>>      "posted_at": string
>>>    }
>>>  ],
>>>  "message": string
>>>}
>>>```

### 3. /property-channel-posts

>>API route handler that retrieves all posts related to a specific property.
>>
>>- **Request:**
>>>  - `req` - Request object containing property ID in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with property-related posts or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "data": [
>>>    {
>>>      "post_id": string,
>>>      "property_id": string,
>>>      "creator_id": string,
>>>      "content": string,
>>>      "replied_to": string,
>>>      "posted_at": string
>>>    }
>>>  ],
>>>  "message": string
>>>}
>>>```

---

## Request Route (/request)

### 1. /

>>API route handler that retrieves details for a request by ID.
>>
>>- **Request:**
>>>  - `req` - Request object with request ID in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with request details or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "data": {
>>>    "request_id": string,
>>>    "unit_id": string,
>>>    "type": RequestType,
>>>    "description": string,
>>>    "employee_id": string,
>>>    "status": RequestStatus
>>>  },
>>>  "message": string
>>>}
>>>```

### 2. /unit

>>API route handler that retrieves all requests associated with a specific unit ID.
>>
>>- **Request:**
>>>  - `req` - Request object with unit ID in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with requests data or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "data": [
>>>    {
>>>      "request_id": string,
>>>      "unit_id": string,
>>>      "type": RequestType,
>>>      "description": string,
>>>      "employee_id": string,
>>>      "status": RequestStatus
>>>    }
>>>  ],
>>>  "message": string
>>>}
>>>```

### 3. /employee

>>API route handler that retrieves all requests associated with a specific employee by ID.
>>
>>- **Request:**
>>>  - `req` - Request object with employee ID in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with employee requests or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "data": [
>>>    {
>>>      "request_id": string,
>>>      "unit_id": string,
>>>      "type": RequestType,
>>>      "description": string,
>>>      "employee_id": string,
>>>      "status": RequestStatus
>>>    }
>>>  ],
>>>  "message": string
>>>}
>>>```

---
### 4. /new

>>API route handler that registers a new request given unit id, description and type.
>>
>>- **Request:**
>>>  - `req` - Request object 
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with the given request_id and status or rejects with an error.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "status": number,
>>>  "request_id": string,
>>>}
>>>```

---

## Sign Up Route (/signup)

### 1. /

>>API route handler for registering a new user.
>>
>>- **Request:**
>>>  - `req` - Request object with user data in body
>>>  - `res` - Response object
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with a response message indicating the result of user registration.
>>
>>Returned object structure:
>>
>>>```json
>>>{
>>>  "response": string
>>>}
>>>```

---

## Login Route (/login)

>>API route handler for user login.
>>
>>- **Request:**
>>>  - `req` - Request object with user credentials in body
>>>  - `res` - Response object with optional login data
>>>  - `next` - Next function for error handling
>>
>>- **Response:**
>>>  - A Promise that resolves to an object with login response or rejects with an error.
>>
>>Returned object structure:
>>
>>If login is successful:
>>```json
>>{
>>  "response": string,
>>  "loginData": {
>>    "fullname": string,
>>    "email": string,
>>    "phone_number": string,
>>    "profile_picture": string,
>>    "account_id": string,
>>    "account_type": string
>>  }
>>}
>>```
>>
>>If login fails:
>>```json
>>{
>>  "response": string
>>}
>>```

---
