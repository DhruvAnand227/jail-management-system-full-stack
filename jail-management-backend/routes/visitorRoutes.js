const express = require("express");
const router = express.Router();
const newPrisoner = require('../models/prisoner-model-schema');
const visitor = require('../models/visitor-model-schema');
const moment = require('moment-timezone');

// Add a new visitor by prisoner id to know which prisoner he meet
router.post('/add/:id', async (req, res) => {
    try {
        const findPrisoner = await newPrisoner.findById(req.params.id);

        if (!findPrisoner) {
            return res.json({ "message": `No prisoner with id ${req.params.id} found` });
        }

        const data = req.body;

        const findVisitor = await visitor.find({ Prisoner_ID: req.params.id, Relation_With_Prisoner: data.Relation_With_Prisoner.toUpperCase() });

        if (findVisitor.length > 0) {
            const updateResult = await visitor.updateOne(
                { _id: findVisitor[0]._id },
                { $inc: { Visit_Count: 1 } }
            );
            res.json({ message: "Visitor already present" })
            return;
        }

        const entryTime = moment.tz("Asia/Kolkata").toDate();
        const exitTime = new Date(entryTime.getTime() + data.Total_Meet_Time * 60000);

        const newVisitor = new visitor({
            Visitor_Name: data.Visitor_Name.toUpperCase(),
            Prisoner_ID: req.params.id,
            Relation_With_Prisoner: data.Relation_With_Prisoner.toUpperCase(),
            Entry_Time: entryTime,
            Exit_Time: exitTime,
            Total_Meet_Time: data.Total_Meet_Time
        })

        await newVisitor.save();

        res.json({ "message": "Visitor data added succesfully" });
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Get all visitors
router.get('/all', async (req, res) => {
    try {
        const visitors = await visitor.find();
        res.json(visitors);
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
});

// Filter visitor data by date
router.get('/filter/:year/:month/:date', async (req, res) => {
    try {
        const year = parseInt(req.params.year);
        const month = parseInt(req.params.month) - 1;
        const date = parseInt(req.params.date);

        const startOfDay = new Date(year, month, date, 0, 0, 0);
        const endOfDay = new Date(year, month, date, 23, 59, 59);

        const visitors = await visitor.find({
            Entry_Time: { $gte: startOfDay, $lte: endOfDay }
        });

        if (visitors.length === 0) {
            return res.json([])
        }
        res.json(visitors);
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