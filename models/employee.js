const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean },
    department: {type: String, require: true },
  },
  { collection: "employees" }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;