const express = require("express");
const app = express();
const gql = require("./graphql");

const port = process.env.PORT || 10109;
const logger = (req, res, next) => {
 const o = {
  path: req.path,
  status: res.statusCode
 };
 console.table([o]);
 next();
};

app.use(logger);
app.use("/graphql", gql);

app.listen(port, () => console.log(`Express GraphQL server running on ${port}`));

module.exports = app;
