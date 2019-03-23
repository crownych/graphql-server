import { Container } from "inversify";
import "reflect-metadata";
import { IPostRepository, IUserRepository, MongoPostRepository, MongoUserRepository } from "./repositories";
import { IPostService, IUserService } from "./services";

const TYPES = {
    UserRepository: Symbol("UserRepository"),
    PostRepository: Symbol("PostRepository"),
    UserService: Symbol("PostService"),
    PostService: Symbol("UserService")
};

const container = new Container();

container.bind<IUserRepository>(TYPES.UserRepository).to(MongoUserRepository);
container.bind<IPostRepository>(TYPES.PostRepository).to(MongoPostRepository);
container.bind<IUserService>(TYPES.UserService).to(MongoUserRepository);
container.bind<IPostService>(TYPES.PostService).to(MongoPostRepository);

export { TYPES, container };
