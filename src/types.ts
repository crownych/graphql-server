import { IPostRepository, IUserRepository } from "./repositories";
import { IPostService, IUserService } from "./services";

// TYPES 需與 inversify.config.ts (container) 設定分開定義

const TYPES = {
    IUserRepository: Symbol("IUserRepository"),
    IPostRepository: Symbol("IPostRepository"),
    IUserService: Symbol("IUserService"),
    IPostService: Symbol("IPostService")
};

export { TYPES };
