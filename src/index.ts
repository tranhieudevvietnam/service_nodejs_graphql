import app, { startExpressServer } from "./helpers/express";
import graphqlServer from "./helpers/apollo";

startExpressServer();

graphqlServer.start().then(() => {
  graphqlServer.applyMiddleware({ app });
});
