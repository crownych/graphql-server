import { helloResolver } from "./helloResolver";
import { postResolver } from "./postsResolver";
import { scalars } from "./scalars";
import { userResolver } from "./usersResolver";

// 方法 1: 使用 lodash 合併
//import { merge } from "lodash";
//const resolvers = merge(helloResolver, userResolver, postResolver);

// 方法 2: 也可以用 array 進行合併
const resolvers = [ helloResolver, userResolver, postResolver, scalars ];

// 方法 3: 使用 merge-graphql-schemas
// https://github.com/okgrow/merge-graphql-schemas
//import { fileLoader, mergeResolvers } from "merge-graphql-schemas";
//const resolvers = mergeResolvers(fileLoader(`${__dirname}/*Resolver`));

export { resolvers };
