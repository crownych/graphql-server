import { injectable } from "inversify";

import "reflect-metadata";

import { IPostRepository } from "../IPostRepository";
import { PostModel } from "./model";

/**
 * This class is responsible for managing post data stored in MongoDB.
 */
@injectable()
export class MongoPostRepository implements IPostRepository {
    public addPost(author: string, title: string, content: string, created_at?: string): any {
        const post = new PostModel({ author: author, title: title, content: content, created_at: created_at});
        return post.save();
    }

    public deletePost(id: string): any {
        return PostModel.deleteOne({ _id: id });
    }

    public updatePost(id: string, author: string, title: string, content: string): any {
        return PostModel.findByIdAndUpdate(id, { $set: { author: author, title: title, content: content} });
    }

    public getPosts(author?: string): any {
        if (author) {
            return PostModel.find({author: author});
        }
        return PostModel.find({});
    }

    public getPost(id: string): any {
        return PostModel.findById(id);
    }
}
