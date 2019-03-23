// 方法 1: 將 schema 定義在各自的 ts 檔案中，import 後統一 export
// import { helloSchema } from "./helloSchema";
// import { postSchema } from "./postSchema";
// import { userSchema } from "./userSchema";
//
// const schemas = [ helloSchema, userSchema, postSchema ];
//
// export { schemas };

// 方法 2: 將 schema 定義在文字檔案中 (.graphql 檔案)
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import path from "path";
import { buildSchema } from "graphql";

// https://github.com/okgrow/merge-graphql-schemas
// - When using the fileLoader function you can also implement your type definitions using .graphql or .graphqls files.
// - The fileLoader function will by default ignore files named index.js or index.ts. This allows you to create your
// index file inside the actual types folder if desired.

//const typesArray = fileLoader(path.join(__dirname, "."), {recursive: true}); // 如果此目錄包含子目錄且都要 load 的話
//const typesArray = fileLoader(path.join(__dirname, "./typedefs"));
//const typesArray = fileLoader(path.join(__dirname, "./**/.graphql"));
const typesArray = fileLoader(`${__dirname}/**/*.graphql`);

// 將 string[] merge 成 string
// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
//const typesMerged = mergeTypes(typesArray, {all: true});
const typesMerged = mergeTypes(typesArray);

// 將合併後的 schema 寫至檔案
//writeFileSync("joined.graphql", typeMerged);

export { typesMerged as typeDefs };
