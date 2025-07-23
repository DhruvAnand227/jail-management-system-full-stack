const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/prison_management");

const staffSchema = new mongoose.Schema({
    Name: String,
    Age: Number,
    Gender: String,
    Designation: String,
    Shifting_Time: String,
    Contact_Number: String,
    Address: String,
    Is_Active: Boolean,
    Resigned: { type: Boolean, default: false }
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
