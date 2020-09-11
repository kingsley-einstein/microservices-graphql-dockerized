const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLString } = require("graphql");
const { UserType, ProductType } = require("../types");
const { UserResolvers } = require("../resolvers");

const query = new GraphQLObjectType({
 name: "Query",
 fields: {
  findUserById: {
   type: UserType,
   resolve: (source, { id }) => id,
   args: {
    id: {
     type: GraphQLID
    }
   }
  },
  findAllUsers: {
   type: new GraphQLList(UserType),
   resolve: (source) => source
  },
  findManyUsersWithLimit: {
   type: new GraphQLList(UserType),
   resolve: (source, { limit, page }) => ({ limit, page }),
   args: {
    limit: {
     type: GraphQLInt
    },
    page: {
     type: GraphQLInt
    }
   }
  }
 }
});

const mutation = new GraphQLObjectType({
 name: "Mutation",
 fields: {
  createUser: {
   type: UserType,
   resolve: (source, args) => UserResolvers.register(args),
   args: {
    name: {
     type: GraphQLString
    },
    age: {
     type: GraphQLInt
    },
    dob: {
     type: GraphQLString
    }
   }
  }
 }
});

module.exports = new GraphQLSchema({
 query,
 mutation
});
