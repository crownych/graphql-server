import { addMockFunctionsToSchema, gql, makeExecutableSchema } from "apollo-server-express";
import { GraphQLSchema } from "graphql";

const postSchema: GraphQLSchema = makeExecutableSchema({
    typeDefs: gql`
        scalar Timestamp

		type Query {
			posts(author: String): [Post]
			post(id: ID!): Post
		}
		type Mutation {
			addPost(author: String!, title: String!, content: String!, created_at: Timestamp): Post
			deletePost(id: ID!): Post
			updatePost(id: ID!, author: String!, title: String!, content: String!): Post
		}
		type Post {
		    _id: ID
		    author: String
		    title: String
		}
	`
});
addMockFunctionsToSchema({ schema: postSchema });

export { postSchema };
