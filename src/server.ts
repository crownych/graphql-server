import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";

import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import cors from "cors";    // tslint:disable-line
import express from "express";
import { GraphQLError, GraphQLFormattedError, GraphQLSchema } from "graphql";
import { MONGO_URL, SERVER_PORT } from "./utils/config";

// define an async function to start server
async function start() {
    // help to debug mongoose
    mongoose.set("debug", true);

    console.log("mongo URL:", MONGO_URL);

    await mongoose.connect(MONGO_URL, { useNewUrlParser: true })
        .catch(reason => {
            console.log("connect to MongoDB failed:", reason);
            process.exit(1);
        });

    const app = express();

    // CORS (express 預設全部允許)
    // https://github.com/expressjs/cors
    // https://note.pcwu.net/2017/03/16/nodejs-cors/
    const whitelist: string[] = ["http://localhost:4001"];
    const corsOptions = {
        origin: (origin: string, callback: any) => {
            //console.log("origin:", origin);
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(undefined, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        // Apollo Server supports only GET/POST requests.
        methods: ["GET", "POST"], //["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Accept", "Authorization"],
        credentials: true,
        optionsSuccessStatus: 204,
        preflightContinue: false
    };
    //app.use(cors(corsOptions)); // express 上 apply CORS
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const schema: GraphQLSchema = makeExecutableSchema({typeDefs, resolvers});

    // GraphQL
    const server = new ApolloServer({
        // 註：若是將 graphql 放在檔案中，前面沒有 gql`...` 宣告，那可以透過 gql() 變成 schema，就可以直接掛到 ApolloServer 中
        // import {gql} from 'apollo-server-express';
        // schema: gql(fs.readFileSync('./src/typedefs/schema.graphql', 'utf8'))
        schema,
        context: async (req: any) => {
            // If we want to put some restriction
        },

        /*
        // Masking and logging errors
        // @See https://www.apollographql.com/docs/apollo-server/features/errors#masking-and-logging-errors
        formatError: (error: GraphQLError) => {
            console.log(error);

            // Solution 1: 自訂 GraphQLFormattedError
            // return {
            //     message: error.message,
            //     locations: error.locations,
            //     path: error.path,
            //     extensions: {
            //         code: error.extensions ? error.extensions.code : undefined
            //     }
            // };

            // Solution 2: 設定 NODE_ENV=production 或 NODE_ENV=test，會清除 stacktrace

            // Solution 3: To disable stacktraces for production, pass debug: false to the Apollo server constructor

            // Solution 4: delete extensions.exception property (stacktrace 會放在 extensions.exception.stacktrace)
            // Or, you can delete the exception information
            if (error.extensions) {
                delete error.extensions.exception;
            }
            return error;
        }
         */

        formatResponse: (response: Response) => {
            console.log(response);
            return response;
        }
    });
    // 只把 CORS 設定在 Apollo Server 上
    //server.applyMiddleware({app, cors: corsOptions});
    server.applyMiddleware({app});

    // // bodyParser is needed just for POST.
    //app.use("/graphql", bodyParser.json(), server);

    // ===================== 註冊其他的 Endpoints 及 routes ======================
    app.get("/test", (req, res) => res.send("hello world"));    // test rest API
    app.options("*", cors(corsOptions));
    // =========================================================================

    return app.listen(SERVER_PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.SERVER_PORT}${server.graphqlPath}`);
    });
}

// call start server function
start().catch((err: Error) => {
    console.log(err);
    process.exit(1);
});
