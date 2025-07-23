const express = require("express");
const router = express.Router();
const newPrisoner = require('../models/prisoner-model-schema');
const visitor = require('../models/visitor-model-schema');
const staff = require('../models/staff-model-schema');

//MiddleWare to login to dashboard
function admin(req, res, next) {

    if (req.body.password === "admin") {
        next();
    }
    else {
        res.json({ "message": "Incorrect password" });
    }
}

// Get active and inactive prisoner data
router.post('/prisonerCount', admin, async (req, res) => {
    try {
        const totalCount = await newPrisoner.countDocuments();
        const activeCount = await newPrisoner.countDocuments({ Is_Active: true });
        const inactiveCount = await newPrisoner.countDocuments({ Is_Active: false });
        const maleCount = await newPrisoner.countDocuments({ Gender: "MALE" });
        const femaleCount = await newPrisoner.countDocuments({ Gender: "FEMALE" });

        res.json({ "Total Prisoners": totalCount, "Active Prisoners": activeCount, "Inactive Prisoners": inactiveCount, "Male Prisoners": maleCount, "Female Prisoners": femaleCount });
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Get Staff data
router.post('/staffCount', admin, async (req, res) => {
    try {
        const totalCount = await staff.countDocuments();
        const activeCount = await staff.countDocuments({ Is_Active: true });
        const inactiveCount = await staff.countDocuments({ Is_Active: false });
        const resignedCount = await staff.countDocuments({ Resigned: true });
        const maleCount = await staff.countDocuments({ Gender: "MALE" });
        const femaleCount = await staff.countDocuments({ Gender: "FEMALE" });

        res.json({ "Total Staffs": totalCount, "Active Staffs": activeCount, "Inactive Staffs": inactiveCount, "Resigned Staffs": resignedCount, "Male Staffs": maleCount, "Female Staffs": femaleCount });
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Get Visitor data
router.post('/visitorCount', admin, async (req, res) => {
    try {
        const visitorCount = await visitor.countDocuments();

        const result = await visitor.aggregate([
            {
                $group: {
                    _id: null,
                    averageTimeMeet: { $avg: "$Total_Meet_Time" }
                }
            }
        ])

        if (result.length === 0) {
            return res.json({ "Message": "No data found!" })
        }

        res.json({ "Total Visitors": visitorCount, "Average Time": result[0].averageTimeMeet });
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

module.exports = router;