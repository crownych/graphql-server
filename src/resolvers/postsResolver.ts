import { container } from "../inversify.config";
import { IPostService } from "../services";
import { TYPES } from "../types";

import { ApolloError, UserInputError } from "apollo-server-express";

const postService: IPostService = container.get<IPostService>(TYPES.IPostService);

const postResolver = {
    Mutation: {
        addPost: (obj: any, args: any, context: any, info: any) => postService.addPost(
            args.input.author, args.input.title, args.input.content, args.input.created_at
        ),
        deletePost: (obj: any, args: any, context: any, info: any) => postService.deletePost(args.id),
        updatePost: (obj: any, args: any, context: any, info: any) => postService.updatePost(
            args.id, args.input.author, args.input.title, args.input.content
        )
    },
    Query: {
        posts: (obj: any, args: any, context: any, info: any) => postService.getPosts(args.author),
        post: (obj: any, args: any, context: any, info: any) => {
            if (!args.hasOwnProperty("id") || args.id === "") {
                // solution 1: 直接使用 UserInputError (code 會是 "BAD_USER_INPUT"), 可自訂 property 如 invalidArgs
                // property 會成為 errors.extensions.<property>
                throw new UserInputError("id is required", {
                    invalidArgs: Object.keys(args)
                });

                // solution 2: 使用自訂 Error 指定 errors.message, errors.extensions.code, errors.extensions.<property>
                //throw new ApolloError("id is required", "400", {test: "tt"});
            }
            return postService.getPost(args.id);
        }
    }
};

export { postResolver };
