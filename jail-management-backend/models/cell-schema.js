const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/prison_management");

const cellSchema = new mongoose.Schema({
    Cell_Number: String,
    Status: { type: String, enum: ["allocated", "unallocated"], default: "unallocated" }
})

const Cell = mongoose.model("Cell", cellSchema);

// const seedCells = async () => {
//     const cells = [
//         { Cell_Number: "P15R", Status: "unallocated" },
//         { Cell_Number: "Q23S", Status: "unallocated" },
//         { Cell_Number: "X45Y", Status: "unallocated" },
//         { Cell_Number: "A78B", Status: "unallocated" },
//         { Cell_Number: "C01D", Status: "unallocated" },
//         { Cell_Number: "E67F", Status: "unallocated" },
//         { Cell_Number: "G34H", Status: "unallocated" },
//         { Cell_Number: "I98J", Status: "unallocated" },
//         { Cell_Number: "N56P", Status: "unallocated" },
//         { Cell_Number: "R72T", Status: "unallocated" }
//     ];


//     await Cell.insertMany(cells)
//     console.log("Cells seeded ✅");
// };

// seedCells();

module.exports = Cell;