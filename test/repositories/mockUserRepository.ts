import { injectable } from "inversify";
import { IUserRepository } from "../../src/repositories";

let _users: any = [];

/**
 * This class is responsible for mocking user repository
 */
@injectable()
export class MockUserRepository implements IUserRepository {
    public addUser(name: string, surname: string): any {
        const user = {
            _id: _users.length.toString(),
            name: name,
            surname: surname
        };
        _users.push(user);
        return user;
    }

    public deleteUser(id: string): any {
        const idx: number = _users.findIndex((value: any) => value._id === id);
        if (idx === 0) {
            _users = _users.slice(1);
        } else if (idx > 0) {
            _users = _users.slice(0, idx).concat(_users.slice(idx + 1));
        }
        return undefined;
    }

    public updateUser(id: string, userData: any): any {
        const idx: number = _users.findIndex((value: any) => value._id === id);
        _users[idx] = {
            _id: id,
            name: userData.name,
            surname: userData.surname
        };
        return _users[idx];
    }

    public users(): any {
        return _users;
    }

    public user(id: string): any {
        return _users.find((value: any) => {
            if (value._id === id) {
                return value;
            }
        });
    }
}
