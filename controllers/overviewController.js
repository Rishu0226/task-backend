// controllers/overviewController.js

exports.totalCounts = (vehicleData, res) => {
    const totalVehicles = vehicleData.length;
    const electricVehicles = vehicleData.filter(vehicle => vehicle['Electric Vehicle Type']).length;
    const percentageElectric = ((electricVehicles / totalVehicles) * 100).toFixed(2);

    res.json({
        totalVehicles,
        electricVehicles,
        percentageElectric
    });
};

exports.topMetrics = (vehicleData, res) => {
    const makeCounts = {};
    const countyCounts = {};

    // Count occurrences of each make and county
    vehicleData.forEach(vehicle => {
        const make = vehicle.Make;
        const county = vehicle.County;

        makeCounts[make] = (makeCounts[make] || 0) + 1;
        countyCounts[county] = (countyCounts[county] || 0) + 1;
    });

    // Convert makeCounts to the desired format
    const topMakes = Object.entries(makeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([make, count]) => ({ name: make, value: count }));

    // Convert countyCounts to the desired format
    const topCounties = Object.entries(countyCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([county, count]) => ({ name: county, value: count }));

    // Respond with the reformatted data
    res.json({
        topMakes,
        topCounties
    });
};
