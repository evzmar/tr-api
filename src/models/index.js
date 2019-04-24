const mongoose = require("mongoose");

const User = require("./user");
const Company = require("./company");

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

module.exports = {
  models: {
    User,
    Company
  },
  connectDb
};
