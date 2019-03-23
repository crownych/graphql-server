# AplloServer 2.0 - How to create a GraphQL server

https://www.dzurico.com/apolloserver-2-0-how-to-create-a-graphql-server/

- GitHub：[daniele-zurico/graphql-setup](https://github.com/daniele-zurico/graphql-setup/tree/graph2)

## Installation

- install nodemon to watch typescript change
  https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change

- install mongodb https://treehouse.github.io/installation-guides/mac/mongo-mac.html
  
  ```bash
  # install mongodb
  $ brew update && brew install mongodb
    
  # start mongodb
  $ brew services start mongodb
  ```

- create a db called `graphExample`
  
  ```bash
  # using `mongo` shell to connect mongodb 
  $ mongo
    
  /usr/local/bin/mongo
  MongoDB shell version v4.0.3
  connecting to: mongodb://localhost:27017/graphExample
  Implicit session: session { "id" : UUID("a9f9f569-ef2c-4856-84d8-5925c62f38ec") }
  MongoDB server version: 4.0.3
  
  > use graphExample
  ```

- create a collection called `users` that will contains `name` and `surname`
  
  ```bash
  > db.createCollection("users")
  { "ok" : 1 }
  
  > show collections
  users
  ```

- install dependencies

  ```bash
  $ yarn install
  ```    

## Infrastructure to Build
 
1. NodeJS with Typescript
2. mongoose
3. apollographql/apollo-server 2.0
4. express

## Components

We need to create a `src` folder and under it same sub-folder to organise better our code:

- `schemas`: Required by GraphQL and provides a clear contract for client-server communication. It’s an abstract description of the server’s capabilities;
- `resolvers`: Each field in a GraphQL schema is backed by a resolver. Each resolver knows how to fetch the data for its field;
- `models`: Used by mongo/mongoose to describe each collection and the schema that is using;
- `controllers`: it’s where the action happens, it defines the logic and the action to take to retrieve the information we need;
- `server.ts`: the starting point!.

## GraphiQL 範例操作

Open http://localhost:4001 in browser.  


### Query user by ID

```
query GetUser {
    user (id: "5c7f4f6d5615ed40dc98b0ab") {
        _id
        name
        surname
    }
}


// 然後透過 client 傳入 variables
query GetUser ($id: ID!) {
  user (id: $id) {
    _id
    name
    surname
  }
}
```

### Query all users

```
query GetAllUsers {
    users {
        _id
        name
        surname
    }    
}
```

### Add user
   
```
mutation AddUser {
    addUser(name: "Tod", surname: "Shen") {
        _id
        name
        surname
    }
}
``` 
   
    
### Update user

```
mutation UpdateUser {
    updateUser(id: "5c763f9b136f6976563bb7ed", name: "Tod", surname: "Shen") {
        _id
        name,
        surname
    }
}
```

### DELETE user

```
mutation DeleteUser {
    deleteUser (id:"5c763f9b136f6976563bb7ed") {
        _id
        name
        surname
    }
}
```

### Fragment Query (將 query 拼接在一起)

Fragement 蠻適合前端依據不同 component 需要的資訊不同，將不同元件需要的欄位 (fields) 定義在 fragment 中，然後一起查詢，GraphQL 只會返回聯集的欄位。

以下範例，只會返回最多 `_id`、`name`、`surname` 三個欄位。

```
query GetAllUsersWithFragments {
    users {
        ...userForComponent1
        ...userForComponent2
        ...userForComponent3
    }
}

fragment userForComponent1 on User {
    _id
    name
}

fragment userForComponent2 on User {
    name
    surname
}

fragment userForComponent3 on User {
    _id
    surname
}
```

### 使用一個 request 進行多項 query

將多個 query 放在一個 request 進行查詢

```
query MultipleQueriesInOneRequest {
  allUsers {
		...userInfoForComponent1
  }
  # 使用 userList 當回傳 data 的 alias
  userList: users {
    ...userInfoForComponent2
  }
}
```

## MISC

- 產生 Typescript Document
  https://blog.cloudflare.com/generating-documentation-for-typescript-projects/
- Fetch GraphQL API example
  ```javascript
  fetch('http://localhost:4001/graphql', {
    body: JSON.stringify({operationName: "users", query:"query users{users{_id name}}", variables: {}}),
    headers: {
      'Content-Type':'application/json'
    },
    method: "POST",
    cache: "no-cache"  
  })
    .then(res => res.json())
    .then(result => console.log(result.data.users))
    .catch(err => console.log(err));
- Setting up test coverage using Mocha, Istanbul, NYC with TypeScript
  https://azimi.me/2016/09/30/nyc-mocha-typescript.1.html
  ```  

