import { addMockFunctionsToSchema, gql, makeExecutableSchema } from "apollo-server-express";
import { GraphQLSchema } from "graphql";

const userSchema: GraphQLSchema = makeExecutableSchema({
    typeDefs: gql`
        scalar Timestamp

		type Query {
			users: [User]
			user(id: ID!): User
		}
		type Mutation {
			addUser(name: String!, surname: String!, created_at: Timestamp): User
			deleteUser(id: ID!): User
			updateUser(id: ID!, name: String!, surname: String!): User
		}
		type User {
			_id: ID
			name: String
			surname: String
			created_at: Timestamp
			posts: [Post]
		}
		type Post {
		    _id: ID
		    author: String
		    title: String
		    created_at: Timestamp
		}
	`
});
addMockFunctionsToSchema({ schema: userSchema });

export { userSchema };
