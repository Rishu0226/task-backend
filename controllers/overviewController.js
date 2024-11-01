// controllers/overviewController.js
const loadCSVData = require('../loadCSV');

exports.totalCounts = async (req, res) => {
    try {
      const vehicleData = await loadCSVData();
      const totalVehicles = vehicleData.length;
      const electricVehicles = vehicleData.filter(vehicle => vehicle['Electric Vehicle Type']).length;
      const percentageElectric = ((electricVehicles / totalVehicles) * 100).toFixed(2);
  
      res.json({
        totalVehicles,
        electricVehicles,
        percentageElectric
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to load data' });
    }
  };

exports.topMetrics = async (req, res) => {
    try {
      const vehicleData = await loadCSVData();
      const makeCounts = {};
      const countyCounts = {};
  
      vehicleData.forEach(vehicle => {
        const make = vehicle.Make;
        const county = vehicle.County;
  
        makeCounts[make] = (makeCounts[make] || 0) + 1;
        countyCounts[county] = (countyCounts[county] || 0) + 1;
      });
  
      const topMakes = Object.entries(makeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([make, count]) => ({ name: make, value: count }));
  
      const topCounties = Object.entries(countyCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([county, count]) => ({ name: county, value: count }));
  
      res.json({
        topMakes,
        topCounties
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to load data' });
    }
  };
  
