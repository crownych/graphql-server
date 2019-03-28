import { Container, interfaces } from "inversify";
import { IPostRepository, IUserRepository, MongoPostRepository, MongoUserRepository } from "./repositories";
import { IPostService, IUserService, PostService, UserService } from "./services";

const TYPES = {
    IUserRepository: Symbol("IUserRepository"),
    IPostRepository: Symbol("IPostRepository"),
    IUserService: Symbol("IUserService"),
    IPostService: Symbol("IPostService")
};

const container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(MongoUserRepository);
container.bind<IPostRepository>(TYPES.IPostRepository).to(MongoPostRepository);

// 這樣的寫法搭配 @inject 會發生注入 repo 找不到的問題，原因還不明，所以先用下方 toConstantValue() 的作法產生實例：
// container.bind<IUserService>(TYPES.IUserRepository).to(UserService);
// container.bind<IPostService>(TYPES.IPostRepository).to(PostService);

const userService: IUserService = new UserService(container.get<IUserRepository>(TYPES.IUserRepository));
container.bind<IUserService>(TYPES.IUserService).toConstantValue(userService);

const postService: IPostService = new PostService(container.get<IPostRepository>(TYPES.IPostRepository));
container.bind<IPostService>(TYPES.IPostService).toConstantValue(postService);

export { TYPES, container };
