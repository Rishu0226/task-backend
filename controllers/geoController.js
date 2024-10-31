// controllers/geoController.js

exports.mapView = (vehicleData, res) => {
    const locationCounts = {};

    vehicleData.forEach(vehicle => {
        const locationKey = `${vehicle.County}, ${vehicle.City}, ${vehicle.State}`;
        locationCounts[locationKey] = (locationCounts[locationKey] || 0) + 1;
    });

    res.json(locationCounts);
};

exports.heatmap = (vehicleData, res) => {
    // You can implement a similar logic as mapView or create a different aggregation
    const heatmapData = {}; // Define your heatmap logic here
    res.json(heatmapData);
};
