import "reflect-metadata";

import { injectable } from "inversify";
import { IUserRepository } from "../IUserRepository";
import { UserModel } from "./model";

/**
 * This class is responsible for managing user data stored in MongoDB.
 */
@injectable()
export class MongoUserRepository implements IUserRepository {
    public addUser(name: string, surname: string, created_at?: string): any {
        const user = new UserModel({ name: name, surname: surname, created_at: created_at});
        return user.save();
    }

    public deleteUser(id: string): any {
        return UserModel.deleteOne({ _id: id });
    }

    public updateUser(id: string, userData: any): any {
        return UserModel.findByIdAndUpdate(id, { $set: userData });
    }

    public users(): any {
        return UserModel.find({});
    }

    public user(id: string): any {
        return UserModel.findById(id);
    }
}
