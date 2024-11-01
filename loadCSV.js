// api/utils/loadCSV.js
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

async function loadCSVData() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.resolve('Electric_Vehicle_Population_Data.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

module.exports = loadCSVData;
