const { helpers } = require("../helpers");

const { Router } = require("express");
const { models } = require("./../models");
const router = Router();

router.get("/", async (req, res) => {
  return helpers.ResultHandler(
    await models.Company.find().populate("users"),
    res
  );
});

router.get("/:companyId", async (req, res) => {
  const { companyId } = req.params;
  return helpers.ResultHandler(
    await models.Company.findById(companyId).populate("users"),
    res
  );
});

router.post("/", async (req, res) => {
  const { name, type, users } = req.body;
  return helpers.ResultHandler(
    await models.Company.createCompany(name, type, users),
    res
  );
});

router.put("/:companyId", async (req, res) => {
  const { userId } = req.body;
  const { companyId } = req.params;
  return helpers.ResultHandler(
    await models.Company.addUser(companyId, userId),
    res
  );
});

module.exports = router;
