/* tslint:disable */
// 先關閉檢查，等實作再打開

/*
 * Apollo Server integration test:
 *
 * 1. Data Source
 *    https://www.apollographql.com/docs/apollo-server/v2/features/data-sources.html
 * 2. Integration Testing
 *    https://www.apollographql.com/docs/apollo-server/v2/features/testing.html
 * 3. Mocking
 *    https://www.apollographql.com/docs/apollo-server/features/mocking.html
 */

import "mocha";
import "reflect-metadata";

import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-express";
import {expect} from "chai";
import { GraphQLSchema } from "graphql";
import { resolvers } from "../src/resolvers";
import { typeDefs } from "../src/schemas";

import { createTestClient } from "apollo-server-testing";

const schema: GraphQLSchema = makeExecutableSchema({typeDefs, resolvers});
const server = new ApolloServer({
    schema
});
// use the test server to create a query function
const { query } = createTestClient(server);

describe("Test GraphQL Server", () => {
    it("Query hello", async () => {
        const HELLO = gql`query hello {hello}`;
        const res = await query({ query: HELLO});
        expect(res.data).to.have.property('hello', "Hello world!");
    });
});
