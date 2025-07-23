const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/prison_management");

const visitorSchema = new mongoose.Schema({
    Visitor_Name: { type: String, required: true },
    Prisoner_ID: { type: String, required: true },
    Visit_Count: { type: Number, default: 1 },
    Relation_With_Prisoner: { type: String, required: true },
    Entry_Time: { type: Date, required: true },
    Exit_Time: { type: Date, required: true },
    Total_Meet_Time: { type: Number, min: 0, max: 60 } // Assuming Total_Meet_Time is in minutes
});

const Visitor = mongoose.model("Visitor", visitorSchema);
module.exports = Visitor;
