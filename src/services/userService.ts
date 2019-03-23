import { inject, injectable } from "inversify";
import { TYPES } from "../inversify.config";
import { IUserRepository, MongoUserRepository } from "../repositories";

/*
import { UserModel } from "mongo";

// 依據商務需求定義 service interface
const userService = {
    addUser: (name: string, surname: string) => {
        const user = new UserModel({ name: name, surname: surname });
        return user.save();
    },
    deleteUser: (id: string) => UserModel.deleteOne({ _id: id }),
    updateUser: (id: string, userData: any) => {
        return UserModel.findOneAndUpdate(id, { $set: userData });
    },
    users: () => UserModel.find({}),
    user: (id: string) => UserModel.findById(id)
};
*/

export interface IUserService {
    addUser(name: string, surname: string, created_at?: string): any;
    deleteUser(id: string): any;
    updateUser(id: string, userData: any): any;
    users(): any;
    user(id: string): any;
}

/**
 * This class is responsible for managing user entities
 */
@injectable()
export class UserService implements IUserService {
    private readonly _userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    public addUser(name: string, surname: string, created_at?: string): any {
        return this._userRepository.addUser(name, surname, created_at);
    }

    public deleteUser(id: string): any {
        return this._userRepository.deleteUser(id);
    }

    public updateUser(id: string, userData: any): any {
        return this._userRepository.updateUser(id, userData);
    }

    public users(): any {
        console.log("users...");
        return this._userRepository.users();
    }

    public user(id: string): any {
        return this._userRepository.user(id);
    }
}
