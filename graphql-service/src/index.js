const express = require("express");
const app = express();

const port = process.env.PORT || 10109;

app.listen(port, () => console.log(`Express GraphQL server running on ${port}`));

module.exports = app;
