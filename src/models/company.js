const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  type: {
    type: String,
    enum: ["shipping", "transportation"]
  },
  users: {
    type: Array
  }
});

companySchema.statics.createCompany = async function(
  name,
  type = "shipping",
  users = {}
) {
  const company = new Company({ name, type, users });
  company.save(err => {
    if (err) console.log(err);
    console.log(`Company ${name} was added`);
  });
};

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
