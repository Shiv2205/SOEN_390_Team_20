

# Back-End

This is the back-end component of the web application. It provides the server, API routes, and database access.

## Technologies

- Node.js
- Express
- TypeScript
- SQLite

## Getting Started

1. Install dependencies

    ```bash
    npm install
    ```
    or

    ```bash
    yarn install
    ```

2. Build the project

    ```bash
    npm run build
    ```
    or
    ```bash
    yarn build
    ```

3. Start the server

    ```bash
    npm start
    ```
    or
    ```bash
    yarn start
    ```

   The server will be running on [http://localhost:3000](http://localhost:3000).

## Project Structure

```bash
Back-End/
├── app.ts         # Entry point, app setup
├── routes/        # API routes
├── controllers/   # DB controllers
├── data/          # SQLite database
├── Factory/       # Factory to create and share instance of DB controller
├── repo/          # Repository classes
├── sql/           # DDL and DML
├── test/          # Jest test suites
└── types/         # User-defined types for the app
```

## API Documentation

[API Routes Documentation](Docs.md)

## Database

SQLite is used for the database. The schema definition and seed data are in `/sql`.

## Testing

TODO: Provide info on tests

## Deployment

TODO: Provide notes on how to deploy this component
