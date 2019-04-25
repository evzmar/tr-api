const { Router } = require("express");
const { models } = require("./../models");
const { helpers } = require("./../helpers");
const router = Router();

router.get("/", async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId);
  return res.send(user);
});

router.post("/", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    companyId,
    roles,
    companyType = ""
  } = req.body;
  if (!(await models.Company.findById(companyId))) {
    const error = helpers.ErrorHandler(new Error("Company doesn't exists"));
    return helpers.ResultHandler(error, res);
  }

  const user = models.User({
    email,
    password,
    firstName,
    lastName,
    companyId,
    roles,
    companyType
  });
  const result = await models.User.createUser(user);
  if (!result.hasError) await models.Company.addUser(companyId, user.id);
  else helpers.ErrorHandler(result);
  return helpers.ResultHandler(result, res);
});

module.exports = router;
