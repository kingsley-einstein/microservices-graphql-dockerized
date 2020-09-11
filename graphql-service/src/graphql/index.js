const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

module.exports = graphqlHTTP((req, r) => ({
 context: req,
 graphiql: true,
 schema
}));
