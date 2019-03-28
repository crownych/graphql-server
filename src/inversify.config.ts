import { Container, interfaces } from "inversify";
import { IPostRepository, IUserRepository, MongoPostRepository, MongoUserRepository } from "./repositories";
import { IPostService, IUserService, PostService, UserService } from "./services";
import { TYPES } from "./types";

const container = new Container({ defaultScope: "Singleton" });

container.bind<IUserRepository>(TYPES.IUserRepository).to(MongoUserRepository);
container.bind<IPostRepository>(TYPES.IPostRepository).to(MongoPostRepository);

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IPostService>(TYPES.IPostService).to(PostService);

/*
const userService: IUserService = new UserService(container.get<IUserRepository>(TYPES.IUserRepository));
container.bind<IUserService>(TYPES.IUserService).toConstantValue(userService);

const postService: IPostService = new PostService(container.get<IPostRepository>(TYPES.IPostRepository));
container.bind<IPostService>(TYPES.IPostService).toConstantValue(postService);
*/

export { container };
