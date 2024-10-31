// index.js
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');
const app = express();
const port = 8000;

let vehicleData = [];
app.use(cors());

// Load data from CSV on startup
fs.createReadStream('Electric_Vehicle_Population_Data.csv')
  .pipe(csv())
  .on('data', (row) => vehicleData.push(row))
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// Import API routes from controllers
const overviewController = require('./controllers/overviewController');
const geoController = require('./controllers/geoController');
const characteristicsController = require('./controllers/characteristicsController');
const trendsController = require('./controllers/trendsController');
const insightsController = require('./controllers/insightsController');

// Overview Dashboard
app.get('/overview/totalCounts', (req, res) => overviewController.totalCounts(vehicleData, res));
app.get('/overview/topMetrics', (req, res) => overviewController.topMetrics(vehicleData, res));

// Geographical Distribution
app.get('/geo/mapView', (req, res) => geoController.mapView(vehicleData, res));
app.get('/geo/heatmap', (req, res) => geoController.heatmap(vehicleData, res));

// Vehicle Characteristics
app.get('/characteristics/typeDistribution', (req, res) => characteristicsController.typeDistribution(vehicleData, res));
app.get('/characteristics/cafvEligibility', (req, res) => characteristicsController.cafvEligibility(vehicleData, res));
app.get('/characteristics/electricRange', (req, res) => characteristicsController.electricRange(vehicleData, res));

// Yearly Trends
app.get('/trends/modelYear', (req, res) => trendsController.modelYearTrend(vehicleData, res));
app.get('/trends/msrpTrend', (req, res) => trendsController.msrpTrend(vehicleData, res));

// Manufacturer Insights
app.get('/insights/popularMakes', (req, res) => insightsController.popularMakes(vehicleData, res));
app.get('/insights/electricVsNonElectric', (req, res) => insightsController.electricVsNonElectric(vehicleData, res));

// Utility & Legislative Insights
app.get('/utility/electricUtilityDistribution', (req, res) => insightsController.utilityDistribution(vehicleData, res));
app.get('/utility/legislativeDistrict', (req, res) => insightsController.legislativeDistrict(vehicleData, res));
// avgElectricRangeByMake
app.get('/characteristics/avgElectricRangeByMake', (req, res) => characteristicsController.avgElectricRangeByMake(vehicleData, res));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
