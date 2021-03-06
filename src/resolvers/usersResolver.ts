import { AuthenticationError } from "apollo-server-express";
import { container } from "../inversify.config";
import { IPostService, IUserService } from "../services";
import { TYPES } from "../types";

const userService: IUserService = container.get<IUserService>(TYPES.IUserService);
const postService: IPostService = container.get<IPostService>(TYPES.IPostService);

const userResolver = {
    Mutation: {
        addUser(obj: any, args: any, context: any, info: any) {
            return userService.addUser(args.name, args.surname, args.created_at);
        },
        deleteUser(obj: any, args: any, context: any, info: any) {
            return userService.deleteUser(args.id);
        },
        updateUser(obj: any, args: any, context: any, info: any) {
            const id = args.id;
            const userData = { ...args };
            delete userData.id;
            return userService.updateUser(id, userData);
        }
    },
    Query: {
        users(obj: any, args: any, context: any, info: any) {
            // if (!context.user) {
            //     throw new AuthenticationError("you must be logged in");
            // }
            return userService.users();
        },
        user(obj: any, args: any, context: any, info: any) {
            return userService.user(args.id);
        }
    },
    User: {
        posts: (obj: any, args: any, context: any, info: any) => postService.getPosts(args.author)
    }
};

export { userResolver };
