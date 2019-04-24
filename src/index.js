require("dotenv/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

const { models, connectDb } = require("./models");
const routes = require("./routes");

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("")
  };
  next();
});

// Routes

app.use("/users", routes.user);
app.use("/company", routes.company);

// Start
connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
