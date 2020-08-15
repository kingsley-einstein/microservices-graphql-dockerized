const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

module.exports = (req, res, next) => graphqlHTTP({
 context: req,
 graphiql: true,
 schema
});
