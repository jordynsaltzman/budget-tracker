const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  transaction: { type: String, required: true },
  amount: { type: Number, required: true }
});

const Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;
