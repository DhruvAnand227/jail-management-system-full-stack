const express = require("express");
const router = express.Router();
const newPrisoner = require('../models/prisoner-model-schema');
const Cell = require('../models/cell-schema');
const visitor = require('../models/visitor-model-schema');

// Add the prisioner
router.post('/add', async (req, res) => {
    try {
        const data = req.body;

        // Get the current date
        const now = new Date();
        const punishmentYears = parseInt(data.Punishment_Time.split(' ')[0]);

        // Create exit date by cloning now and adding years
        const exitDate = new Date(now);
        exitDate.setFullYear(exitDate.getFullYear() + punishmentYears);

        //Get a cell to allocate to a prisioner and assign that cell
        const freeCell = await Cell.findOneAndUpdate(
            { Status: "unallocated" },
            { Status: "allocated" },
            { new: true }
        );

        if (!freeCell) {
            return res.json({ "Message": "No free cells available" });
        }

        // Make a proper crime name (Cyber Crime to CYBERCRIME)
        const crime = data.Crime.split(' ');
        let properCrime = "";
        for (const element of crime) {
            properCrime += element;
        }

        // Make a new entry of prisioner
        const newEntry = new newPrisoner({
            Name: data.Name.toUpperCase(),
            Age: data.Age,
            Gender: data.Gender.toUpperCase(),
            Crime: properCrime.toUpperCase(),
            Cell_Number: freeCell.Cell_Number,
            Date_Of_Entry: now,
            Date_Of_Exit: exitDate,
            Punishment_Time: data.Punishment_Time
        })

        await newEntry.save();

        res.json({ "Message": "Details Added successfully" });
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Delete the prisioner
router.put('/delete/:id', async (req, res) => {
    try {
        // Find the prisioner a get the cell and add it to unallocated cell
        const findPrisoner = await newPrisoner.findById(req.params.id);
        const getCell = findPrisoner.Cell_Number;
        const updateCell = await Cell.findOneAndUpdate(
            { Cell_Number: getCell },
            { Status: "unallocated" }
        )

        // Update the priosioner cell_number to null(don't delete because we want to store the records) and is_active to false
        const deletePrisoner = await newPrisoner.findByIdAndUpdate(
            req.params.id,
            { Cell_Number: null, Is_Active: false },
            { new: true }
        )
        res.json({ "Message": "Deleted Successfully" });
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Update prisioner details
router.put('/update/:id', async (req, res) => {
    try {
        const data = req.body;

        // Get the current date
        const now = new Date();
        const punishmentYears = parseInt(data.Punishment_Time.split(' ')[0]);

        // Create exit date by cloning now and adding years
        const exitDate = new Date(now);
        exitDate.setFullYear(exitDate.getFullYear() + punishmentYears);

        // Change name, age, gender, crime and punishment time
        const updatedPrisoner = await newPrisoner.findByIdAndUpdate(
            req.params.id,
            { Name: data.Name.toUpperCase(), Age: data.Age, Gender: data.Gender.toUpperCase(), Crime: data.Crime.toUpperCase(), Date_Of_Exit: exitDate, Punishment_Time: data.Punishment_Time },
            { new: true }
        )
        res.json({ "Message": "Details updated successfully" });
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Get Prisoner by id
router.get('/one/:id', async (req, res) => {
    try {
        const data = await newPrisoner.findById(req.params.id);

        if (data.length === 0) return res.json([]);

        res.json(data);
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Get all prisoners
router.get('/all', async (req, res) => {
    try {
        const data = await newPrisoner.find();

        if (data.length === 0) return res.json([]);

        res.json(data);
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Add filter by active prisoner
router.get('/filter/active', async (req, res) => {
    try {
        const activePrisoners = await newPrisoner.find({ Is_Active: true })

        if (activePrisoners.length === 0) {
            return res.json([]);
        }

        res.json(activePrisoners);
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

//Add filter by Age
router.get('/filter/age/:startAge/:endAge', async (req, res) => {
    try {
        const startAge = parseInt(req.params.startAge);
        const endAge = parseInt(req.params.endAge);

        const filterByAge = await newPrisoner.find({ Age: { $gte: startAge, $lte: endAge } }).sort({ Age: 1 });

        if (filterByAge.length === 0) {
            return res.json([]);
        }

        res.json(filterByAge);
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Add filter by crime
router.get('/filter/crime/:type', async (req, res) => {
    try {
        const crimeType = String(req.params.type).toUpperCase();

        const findByCrimeType = await newPrisoner.find({ Crime: crimeType });

        if (findByCrimeType.length === 0) {
            return res.json([]);
        }

        res.json(findByCrimeType);
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Add filter by visitor meet
router.get('/filter/visitor/:id', async (req, res) => {
    try {
        const findVisitors = await visitor.find({ Prisoner_ID: req.params.id });

        if (findVisitors.length === 0) {
            return res.json([]);
        }

        res.json(findVisitors);
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})


module.exports = router;