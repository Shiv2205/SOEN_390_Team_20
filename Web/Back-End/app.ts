import app from './index';
const port = process.env.PORT || 3000;

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Handle SIGINT signal
process.on('SIGINT', () => {
  // Close any resources like database connections
  // For example:
  // db.close();

  // Close the Express server
  server.close(() => {
    console.log('Express server closed');
    // Exit the process
    process.exit();
  });
});