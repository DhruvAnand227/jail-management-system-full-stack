const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/prison_management");

const prisonerSchema = new mongoose.Schema({
    Name: String,
    Age: Number,
    Gender: String,
    Crime: String,
    Cell_Number: String,
    Date_Of_Entry: { type: Date },
    Date_Of_Exit: { type: Date },
    Punishment_Time: String,
    Is_Active: { type: Boolean, default: true }
})

const newPrisoner = mongoose.model("newPrisoner", prisonerSchema);
module.exports = newPrisoner;