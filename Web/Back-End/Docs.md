**Class: PropertyMaster**

This class provides methods for managing properties, such as registering new properties, retrieving property details, and fetching all properties associated with a specific admin ID.

---

**Properties:**

- `dbController`: An instance of the `IDBController` interface, responsible for database operations.

---

**Methods:**

1. **`registerNewProperty(propertyDetails: PropertyData): Promise<{status: number; property_id: string} | Error>`**

   Registers a new property asynchronously and returns the status and property ID or an error.

   - **Parameters:**
     - `propertyDetails` (PropertyData): Details of the new property to be registered.

   - **Returns:** 
     - A Promise that resolves to an object with properties `status` (number) and `property_id` (string), or an Error object if there was an error during the process.

   - **Returns Format:** 
     ```typescript
     {
       status: number;
       property_id: string;
     }
     ```

---

2. **`getProperty(property_id: string): Promise<{status: number; data: PropertyData} | Error>`**

   Retrieves property data from the database using a property ID and returns either the data or an error.

   - **Parameters:**
     - `property_id` (string): The unique identifier of the property.

   - **Returns:** 
     - A Promise that resolves to an object containing either a `status` (number) and `data` of type `PropertyData`, or an `Error` object if there was an error during the operation.

   - **Returns Format:** 
     ```typescript
     {
       status: number;
       data: PropertyData;
     }
     ```

---

3. **`getAllProperties(admin_id: string): Promise<{status: number; data: PropertyData[]} | Error>`**

   Retrieves all properties associated with a specific admin ID from the database asynchronously.

   - **Parameters:**
     - `admin_id` (string): The unique identifier of an admin user.

   - **Returns:** 
     - A Promise that resolves to an object with a `status` (number) and an array of `PropertyData` objects, or an Error object if there is an error.

   - **Returns Format:** 
     ```typescript
     {
       status: number;
       data: PropertyData[];
     }
     ```

---

These methods facilitate property management operations, including registration, retrieval, and fetching associated properties. Each method returns a Promise that resolves to the appropriate data structure or an Error object in case of failure.

---

**PropertyData Format:**

```typescript
interface PropertyData {
  property_id?: string;
  admin_id: string;
  unit_count: number;
  parking_count: number;
  locker_count: number;
  address: string;
  picture?: string;
}
```

The `PropertyData` interface represents the structure of property details, including `property_id`, `admin_id`, `unit_count`, `parking_count`, `locker_count`, `address`, and an optional `picture`.


---

