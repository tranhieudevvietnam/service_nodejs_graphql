import { ApolloServer, gql } from "apollo-server-express";
import { Application } from "express";
import AddressSchema from "./../modules/address/address.schema";
import AddressResolver from "../modules/address/address.resolver";
import { loadGraphqlSchema } from "./autoloader";
// import _ from 'lodash';

export class GraphqlServer {
  constructor(public app: Application) {}

  async start() {
    let typeDefs = [
      gql`
        type Query {
          _emptry: String
        }
        type Mutation {
          _emptry: String
        }
        type Subscription {
          _emptry: String
        }
      `,
      AddressSchema,
    ];

    let resolvers: any = {
      // Query: {
      //   _empty: () => "empty",
      // },
      ...AddressResolver,
    };
    // resolvers = _.merge(resolvers, AddressResolver);
    // console.log("resolver", resolvers);

    console.log('schemas',await loadGraphqlSchema());

    const server = new ApolloServer({
      introspection: true,
      typeDefs: typeDefs,
      resolvers: resolvers,
    });

    await server.start();
    server.applyMiddleware({ app: this.app });
  }
}
