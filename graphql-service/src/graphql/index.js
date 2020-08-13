const { graphqlHTTP } = require("express-graphql");

module.exports = (req, res, next) => graphqlHTTP({
 context: req
});
