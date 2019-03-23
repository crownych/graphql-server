/**
 * This interface defined methods for persisting post data.
 */
export interface IPostRepository {
    addPost(author: string, title: string, content: string, created_at?: string): any;
    deletePost(id: string): any;
    updatePost(id: string, author: string, title: string, content: string): any;
    getPosts(author?: string): any;
    getPost(id: string): any;
}
