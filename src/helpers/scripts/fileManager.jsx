const fs = require('fs');
const path = require('path');

class FileManager {
  static readJSON(filePath) {
    try {
      const fullPath = path.resolve(__dirname, filePath);
      const data = fs.readFileSync(fullPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading JSON file:', error);
      return null;
    }
  }

  static writeJSON(filePath, data) {
    try {
      const fullPath = path.resolve(__dirname, filePath);
      fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');
      console.log('JSON file updated successfully!');
    } catch (error) {
      console.error('Error writing JSON file:', error);
    }
  }
}

module.exports = FileManager;
