// controllers/characteristicsController.js

module.exports = {
    typeDistribution: (data, res) => {
      // Electric Vehicle Type
        const typeCounts = {};
        data.forEach(vehicle => {
            const type = vehicle['Electric Vehicle Type'] || 'Non-Electric';
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
        // Convert to array format for graphing
        const typeData = Object.entries(typeCounts).map(([type, value]) => ({ type, value }));
        res.json(typeData);
    },
  
    cafvEligibility: (data, res) => {
      const eligible = data.filter(v => v["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] === 'Clean Alternative Fuel Vehicle Eligible').length;
      const notEligible = data.length - eligible;
      const unknown = data.length - eligible - notEligible;
// convert data to [ , ...] want to change color, add label, color, value
      res.json([
        { eligibility: "Eligible", value: eligible, },
        { eligibility: "Not Eligible", value: notEligible },
        { eligibility: "Unknown", value: unknown }
      ]);
    },
  
    electricRange: (data, res) => {
      const ranges = data.map(row => parseInt(row["Electric Range"], 10)).filter(Boolean);
      res.json({ ranges });
    },
    avgElectricRangeByMake:  (data, res) => {
        const makeRange = {};
       // make heightest range of every make
       // sort by range
         // return all make and range
        data.forEach(vehicle => {
            const make = vehicle.Make;
            const range = parseInt(vehicle["Electric Range"], 10);
            if (range && (!makeRange[make] || range > makeRange[make])) {
                makeRange[make] = range;
            }}
        );
        const makeData = Object.entries(makeRange).map(([make, range]) => ({ make, range }));
        // sort by range
        makeData.sort((a, b) => b.range - a.range);
        res.json(makeData);
    }
  };
  // controllers/characteristicsController.js



  