// controllers/trendsController.js

// Model Year Trend
exports.modelYearTrend = (vehicleData, res) => {
    const yearCounts = {};

    vehicleData.forEach(vehicle => {
        const modelYear = vehicle['Model Year'];
        if (modelYear) {
            yearCounts[modelYear] = (yearCounts[modelYear] || 0) + 1;
        }
    });


    // Convert yearCounts to the desired format
    const yearData = Object.entries(yearCounts).map(([year, count]) => ({
        year: year,
        value: count
    }));

    res.json(yearData);
    
};

// MSRP Trend
exports.msrpTrend = (vehicleData, res) => {
    const msrpCounts = {};

    vehicleData.forEach(vehicle => {
        const msrp = vehicle['Base MSRP'];
        if (msrp) {
            msrpCounts[msrp] = (msrpCounts[msrp] || 0) + 1;
        }
    });

    // Convert msrpCounts to the desired format
    const msrpData = Object.entries(msrpCounts).map(([msrp, count]) => ({
        name: msrp,
        value: count
    }));

    res.json(msrpData);
};

// Vehicle Type Distribution Over Years
exports.vehicleTypeDistribution = (vehicleData, res) => {
    const typeYearCounts = {};

    // Aggregate counts of vehicle types by model year
    vehicleData.forEach(vehicle => {
        const modelYear = vehicle['Model Year'];
        const vehicleType = vehicle['Electric Vehicle Type'] || 'Non-Electric'; // Default to 'Non-Electric' if not specified

        if (!typeYearCounts[modelYear]) {
            typeYearCounts[modelYear] = {};
        }

        typeYearCounts[modelYear][vehicleType] = (typeYearCounts[modelYear][vehicleType] || 0) + 1;
    });

    // Convert to array format for graphing
    const vehicleTypeData = Object.entries(typeYearCounts).map(([year, types]) => {
        return {
            year: year,
            types: Object.entries(types).map(([type, count]) => ({ name: type, value: count }))
        };
    });

    res.json(vehicleTypeData);
};
