import { ApolloServer, gql } from "apollo-server-express";
import jwt from "jsonwebtoken";
import config from "config";
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload";

const users = [
  { id: 1, name: "John Doe", friendIds: [1, 2, 3] },
  { id: 2, name: "John ", friendIds: [1, 4, 3] },
  { id: 3, name: "John 2", friendIds: [1] },
  { id: 4, name: "John 3", friendIds: [1, 3] },
];

const server = new ApolloServer({
  introspection: true,
  typeDefs: gql`
    scalar Mixed
    scalar Upload

    type Query {
      getOneUser(id: String!): User
      getAllUser: [User]
    }
    type User {
      id: Int
      name: String
      age: Int
      view: Int
      comment: Int
      friendIds: [String]

      friends: [User]
    }
    type Mutation {
      setUser(id: String!): String
      login(username: String!, password: String!): LoginData
      singleUpload(file: Upload!): Mixed!
    }
    type LoginData {
      user: User
      token: String
    }
  `,
  resolvers: {
    Query: {
      getOneUser: (root, args, context) => {
        if (!context.isAuth) {
          throw new Error("Unauthenticated!");
        }
        console.log("root", root);
        console.log("context", context);
        context.step = 1;
        return {
          name: "Duong " + args.id,
          age: 20,
          content: "",
        };
      },
      getAllUser: (root, args, context) => {
        return users;
      },
    },
    Mutation: {
      setUser: (root, args, context) => {
        return `Hello ${args.id}`;
      },
      login: (root, args, context) => {
        const { username, password } = args;
        if (username != "admin") {
          throw Error("Username is not valid");
        }
        if (password != "admin") {
          throw Error("Password is not valid");
        }
        // generate token
        const token = jwt.sign({ id: 1, name: "Duong" }, config.get("secret"));
        console.log("token", token);
        return {
          user: {
            name: "Duong",
            age: 20,
          },
          token: token,
        };
      },
      singleUpload: async (parent, { file }) => {
        const { createReadStream, filename, mimetype, encoding } = await file;

        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        // const stream = createReadStream();

        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.
        // const out = require("fs").createWriteStream("local-file-output.txt");
        // stream.pipe(out);
        // await finished(out);

        return { filename, mimetype, encoding };
      },
    },
    User: {
      age: (root, args, context) => {
        console.log("root", root);
        console.log("age context", context);
        return root.age;
      },
      view: (root, args, context) => {
        return 10;
      },
      comment: (root, args, context) => {
        return 20;
      },
      friends: (root, args, context) => {
        return users.filter((user) => root.friendIds.includes(user.id));
      },
    },
  },
  context: ({ req }) => {
    const context: any = {
      isAuth: false,
    };
    const token = req.headers["x-token"];
    if (token) {
      try {
        const payload = jwt.verify(token as string, config.get("secret"));
        context.payload = payload;
        context.isAuth = true;
      } catch (err) {
        context.isAuth = false;
      }
    }
    return context;
  },
});

export default server;
