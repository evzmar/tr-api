const { Router } = require("express");
const { models } = require("./../models");
const router = Router();

router.post("/", async (req, res) => {
  const { name, type, users } = req.body;
  // console.log(req.body);

  // console.log(name, type, users);
  const company = models.Company.createCompany(name, type, users);
  // company.save();
  res.status(200).json(company);
});

module.exports = router;
