import { container, TYPES } from "../inversify.config";
import { IPostService } from "../services";

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
        post: (obj: any, args: any, context: any, info: any) => postService.getPost(args.id)
    }
};

export { postResolver };
