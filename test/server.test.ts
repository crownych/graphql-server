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

/*
import "mocha";
import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import { resolvers } from "../src/resolvers";
import { schemas } from "../src/schemas";


it("fetches single launch", async () => {
    const userAPI = new UserAPI({ store });
    const launchAPI = new LaunchAPI();

    // create a test server to test against, using our production typeDefs,
    // resolvers, and dataSources.
    const server = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        dataSources: () => ({ userAPI, launchAPI }),
        context: () => ({ user: { id: 1, email: 'a@a.a' } }),
    });

    // mock the dataSource's underlying fetch methods
    launchAPI.get = jest.fn(() => [mockLaunchResponse]);
    userAPI.store = mockStore;
    userAPI.store.trips.findAll.mockReturnValueOnce([
        { dataValues: { launchId: 1 } },
    ]);

    // use the test server to create a query function
    const { query } = createTestClient(server);

    // run query against the server and snapshot the output
    const res = await query({ query: GET_LAUNCH, variables: { id: 1 } });
    expect(res).toMatchSnapshot();
});
*/
