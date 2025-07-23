const express = require("express");
const router = express.Router();
const staff = require('../models/staff-model-schema');

// Function to decide that the staff is active now or not
function decideActive(hourTime, Shifting_Time) {
    let isActive = false;

    if (hourTime >= 0 && hourTime <= 8 && Shifting_Time.toUpperCase() === "NIGHT") {
        isActive = !isActive;
    }
    else if (hourTime >= 8 && hourTime <= 16 && Shifting_Time.toUpperCase() === "MORNING") {
        isActive = !isActive;
    }
    else if (hourTime >= 16 && hourTime <= 24 && Shifting_Time.toUpperCase() === "EVENING") {
        isActive = !isActive;
    }

    return isActive;
}

// Hire a new staff
router.post('/hire', async (req, res) => {
    try {
        const newData = req.body;

        const now = new Date();

        // Assigning is active according to shifting time
        const isActive = decideActive(now.getHours(), newData.Shifting_Time);

        // Valid contact number
        if (newData.Contact_Number.length !== 10) {
            return res.json({ "message": "Enter a valid contact number" });
        }

        const newStaff = new staff({
            Name: newData.Name.toUpperCase(),
            Age: newData.Age,
            Gender: newData.Gender.toUpperCase(),
            Designation: newData.Designation.toUpperCase(),
            Shifting_Time: newData.Shifting_Time.toUpperCase(),
            Contact_Number: newData.Contact_Number,
            Address: newData.Address.toUpperCase(),
            Is_Active: isActive
        })

        await newStaff.save();

        res.json({ "message": `New ${newData.Designation} is hired` });
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Update staff info
router.put('/update/:id', async (req, res) => {
    try {
        const newData = req.body;

        const now = new Date();

        // Assigning is active according to shifting time
        const isActive = decideActive(now.getHours(), newData.Shifting_Time);

        // Valid contact number
        if (newData.Contact_Number.length !== 10) {
            return res.json({ "message": "Enter a valid contact number" });
        }

        const updateStaff = await staff.findByIdAndUpdate(
            req.params.id,
            // Gender can never be changed
            { Name: newData.Name.toUpperCase(), Age: newData.Age, Designation: newData.Designation.toUpperCase(), Shifting_Time: newData.Shifting_Time.toUpperCase(), Contact_Number: newData.Contact_Number, Address: newData.Address.toUpperCase(), Is_Active: isActive },
            { new: true }
        )

        res.json({ "message": "Details updated successfully" });
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// fire a staff
router.put('/fire/:id', async (req, res) => {
    try {
        const fireStaff = await staff.findByIdAndUpdate(
            req.params.id,
            { Is_Active: false, Resigned: true },
            { new: true }
        )

        res.json({ "message": `Staff with id ${req.params.id} has been fired` });
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Get all staffs
router.get('/all', async (req, res) => {
    try {
        const getAllStaffs = await staff.find();

        if (getAllStaffs.length === 0) {
            return res.json([]);
        }

        res.json(getAllStaffs);
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Get active staffs
router.get('/active', async (req, res) => {
    try {
        const activeStaffs = await staff.find({ Is_Active: true });

        if (activeStaffs.length === 0) {
            return res.json([]);
        }

        res.json(activeStaffs);
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Get staff by designation
router.get('/filter/designation/:designation', async (req, res) => {
    try {
        const designation = req.params.designation.toUpperCase();

        const getStaffs = await staff.find({ Designation: designation, Resigned: false });

        if (getStaffs.length === 0) {
            return res.json([]);
        }

        res.json(getStaffs);
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

// Get Staff by shifting time
router.get('/filter/shiftingTime/:shiftingTime', async (req, res) => {
    try {
        const shiftingTime = req.params.shiftingTime.toUpperCase();

        const getStaffs = await staff.find({ Shifting_Time: shiftingTime, Resigned: false });

        if (getStaffs.length === 0) {
            return res.json([]);
        }

        res.json(getStaffs);
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

module.exports = router;