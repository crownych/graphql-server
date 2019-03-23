import {expect} from "chai";
import "mocha";
import "reflect-metadata";
import { IUserService, UserService } from "../../src/services";
import { MockUserRepository } from "../repositories";

describe("UserService", () => {
    let userService: IUserService;

    before(() => {
        // run before all tests in this block
        userService = new UserService(new MockUserRepository());
    });

    after(() => {
        // run after all tests in this block
    });

    beforeEach(() => {
        // run before each test in this block
    });

    afterEach(() => {
        // run after each test in this block
    });

    it("Add user", () => {
        const user: any = userService.addUser("Tod", "Shen");
        //console.log("user:", user);

        // 為了避免 「chai-vague-errors」，不要寫成： expect(user._id).not.to.be.undefined
        // 要寫成下列型式才不會被 tslint-microsoft-contrib 靠北
        expect(user._id).not.to.equal(undefined, "user._id should not be undefined");

        expect(user.name).to.equal("Tod");
        expect(user.surname).to.equal("Shen");
    });

    it("Find users", () => {
        const users: [] = userService.users();
        //console.log("users:", users);
        expect(users.length).to.gt(0);
    });

    it("Find user by id", () => {
        const user: any = userService.user("0");
        //console.log("user:", user);
        expect(user.name).to.equal("Tod");
        expect(user.surname).to.equal("Shen");
    });

    it("Find and update user by id", () => {
        const user: any = userService.updateUser("0", {name: "Jack", surname: "Zhu"});
        expect(user.name).to.equal("Jack");
        expect(user.surname).to.equal("Zhu");
    });

    it("Delete user by id", () => {
        const user: [] = userService.deleteUser("0");
        const users: [] = userService.users();
        expect(users.length).to.eq(0);
    });
});
