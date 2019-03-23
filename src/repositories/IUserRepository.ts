/**
 * This interface defined methods for persisting user data.
 */
export interface IUserRepository {
    addUser(name: string, surname: string, created_at?: string): any;
    deleteUser(id: string): any;
    updateUser(id: string, userData: any): any;
    users(): any;
    user(id: string): any;
}
