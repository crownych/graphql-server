import { AuthenticationError } from "apollo-server-express";
import { container, TYPES } from "../inversify.config";
import { IPostService, IUserService } from "../services";

const userService: IUserService = container.get<IUserService>(TYPES.UserService);
const postService: IPostService = container.get<IPostService>(TYPES.PostService);

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
        },
        posts: (obj: any, args: any, context: any, info: any) => postService.getPosts(args.author),
        post: (obj: any, args: any, context: any, info: any) => postService.getPosts(args.id)
    },
    User: {
        posts: (obj: any, args: any, context: any, info: any) => postService.getPosts(args.author)
    }
};

export { userResolver };
