const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {}
});

userSchema.statics.findByLogin = async function(login) {
  const user = await this.findOne({
    email: login
  });

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
