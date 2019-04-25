const { helpers } = require("../helpers");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true },
    lastName: { type: String, default: "" },
    firstName: { type: String, default: "" },
    roles: { type: Array, default: ["logistics-manager"] },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    companyType: { type: String }
  },
  { collection: "users" }
);

userSchema.statics.createUser = async function(user) {
  try {
    return await User.create(user);
  } catch (e) {
    return helpers.ErrorHandler(e);
  }
};

userSchema.statics.findByLogin = async function(login) {
  const user = await this.findOne({
    email: login
  });

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
