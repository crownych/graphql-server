import { addMockFunctionsToSchema, gql, makeExecutableSchema } from "apollo-server-express";
import { GraphQLSchema } from "graphql";

const helloSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: gql`
      type Query {
          hello: String
      }
  `
});

addMockFunctionsToSchema({ schema: helloSchema });

export { helloSchema };
