const { GraphQLString, GraphQLID, GraphQLObjectType, GraphQLNonNull } = require("graphql");
const UserType = require("./user");

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
   resolve: (source) => source.owner
  }
 }
});
