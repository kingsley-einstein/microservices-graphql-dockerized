const express = require("express");
const app = express();
const gql = require("./graphql");

const port = process.env.PORT || 10109;

app.use("/graphql", gql);

app.listen(port, () => console.log(`Express GraphQL server running on ${port}`));

module.exports = app;
