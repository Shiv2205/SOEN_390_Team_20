const fs = require("fs/promises");
const path = require("path");

async function getUserData() {

  let currentDBPath = "test_user_data.json"; //user_data.json

  try {
    let dataFilePath = path.join(process.cwd(), `data/${currentDBPath}`);
    // Read existing data from the file
    const existingData = await fs.readFile(dataFilePath, "utf-8");
    const userData = JSON.parse(existingData);

    return userData;
  } catch (error) {
    console.log({ response: error.message });
  }
}

module.exports = getUserData;
