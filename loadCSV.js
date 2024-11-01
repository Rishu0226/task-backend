// api/utils/loadCSV.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const loadCSVData = () => {
  return new Promise((resolve, reject) => {
    const vehicleData = [];
    const filePath = path.resolve('Electric_Vehicle_Population_Data.csv');

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => vehicleData.push(row))
      .on('end', () => resolve(vehicleData))
      .on('error', (error) => reject(error));
  });
};

module.exports = loadCSVData;
