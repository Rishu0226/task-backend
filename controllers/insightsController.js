// controllers/insightsController.js

exports.popularMakes = (vehicleData, res) => {
    //  [
    //     { make: 'Tesla', count: 0 },
    // ],
    const makeCounts = {};

    vehicleData.forEach(vehicle => {
        const make = vehicle.Make;
        makeCounts[make] = (makeCounts[make] || 0) + 1;
    }
    );

    const makeData = Object.entries(makeCounts).map(([make, count]) => ({ make, count }));
    res.json(makeData);
};

exports.electricVsNonElectric = (vehicleData, res) => {
    const counts = { electric: 0, nonElectric: 0 };

    vehicleData.forEach(vehicle => {
        if (vehicle['Electric Vehicle Type']) {
            counts.electric += 1;
        } else {
            counts.nonElectric += 1;
        }
    });

    res.json(counts);
};

exports.utilityDistribution = (vehicleData, res) => {
    // "CITY OF SEATTLE - (WA)|CITY OF TACOMA - (WA)": 12454,
    const utilityCounts = {};
    // {"name": "CITY OF SEATTLE - (WA)", "value": 12454}
    vehicleData.forEach(vehicle => {
        const utility = vehicle['Electric Utility'];
        utilityCounts[utility] = (utilityCounts[utility] || 0) + 1;
    });

    const utilityData = Object.entries(utilityCounts).map(([name, value]) => ({ name, value }));
    res.json(utilityData);
};

exports.legislativeDistrict = (vehicleData, res) => {
    const districtCounts = {};

    vehicleData.forEach(vehicle => {
        const district = vehicle['Legislative District'];
        districtCounts[district] = (districtCounts[district] || 0) + 1;
    });

    res.json(districtCounts);
};
