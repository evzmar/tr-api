const mongoose = require("mongoose");
const { helpers } = require("./../helpers");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    type: {
      type: String,
      enum: ["logistics-manager", "transportation-manager"],
      required: true
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { collection: "companies" }
);

companySchema.statics.addUser = async function(companyId, userId) {
  try {
    const updatedCompany = await Company.findById(companyId);
    updatedCompany.users.push(userId);
    return await Company.findByIdAndUpdate(companyId, updatedCompany, {
      new: true
    });
  } catch (e) {
    return helpers.ErrorHandler(e);
  }
};

companySchema.statics.createCompany = async function(name, type, users = {}) {
  try {
    return await Company.create({ name, type, users });
  } catch (e) {
    return helpers.ErrorHandler(e);
  }
};

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
