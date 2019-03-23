import { injectable } from "inversify";
import { IPostRepository, MongoPostRepository } from "../repositories";

/*
import { PostModel } from "mongo";

// 依據商務需求定義 service interface
const postService = {
    addPost: (author: string, title: string) => {
        const user = new PostModel({ author: author, title: title });
        return user.save();
    },
    deletePost: (id: string) => PostModel.deleteOne({ _id: id }),
    updatePost: (id: string, author: string, title: string) => {
        return PostModel.findOneAndUpdate(id, { $set: { author: author, title: title } });
    },
    getPosts: (author?: String) => {
        const conditions = {};
        if (author) {
            Object.defineProperty(conditions, "author", {value: author});
        }
        return PostModel.find(conditions);
    },
    getPost: (id: string) => PostModel.findById(id)
};
*/

/**
 * This interface defined methods for managing post data.
 */
export interface IPostService {
    /**
     * Add a new post.
     * @param author - The author of the post.
     * @param title -  The title of the post.
     */
    addPost(author: string, title: string, content: string, created_at?: string): any;
    deletePost(id: string): any;
    updatePost(id: string, author: string, title: string, content: string): any;
    getPosts(author?: String): any;
    getPost(id: string): any;
}

/**
 * This interface implements IPostService.
 */
@injectable()
export class PostService implements IPostService {
    /**
     *  The post repository
     */
    private readonly _postRepository: IPostRepository;

    /**
     * Create a PostService.
     * @param postRepository - The post repository.
     */
    constructor(postRepository: IPostRepository) {
        this._postRepository = postRepository;
    }

    public addPost(author: string, title: string, content: string, created_at?: string): any {
        return this._postRepository.addPost(author, title, content, created_at);
    }

    /**
     * Delete an existing post.
     * @param id - The id of the post.
     */
    public deletePost(id: string): any {
        return this._postRepository.deletePost(id);
    }

    public updatePost(id: string, author: string, title: string, content: string): any {
        return this._postRepository.updatePost(id, author, title, content);
    }

    public getPosts(author?: string): any {
        return this._postRepository.getPosts(author);
    }

    public getPost(id: string): any {
        return this._postRepository.getPost(id);
    }
}
