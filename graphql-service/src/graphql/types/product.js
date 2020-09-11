const { GraphQLString, GraphQLID, GraphQLObjectType, GraphQLNonNull } = require("graphql");
const UserType = require("./user");
const { UserResolvers } = require("../resolvers");

module.exports = new GraphQLObjectType({
 name: "Product",
 fields: {
  id: {
   type: GraphQLID
  },
  name: {
   type: GraphQLString
  },
  description: {
   type: GraphQLString
  },
  owner: {
   type: new GraphQLNonNull(UserType),
   resolve: (source) => UserResolvers.findById(source.owner)
  }
 }
});
