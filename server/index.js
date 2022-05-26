require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema')
const connect = require("./config");
const express = require('express');
const http = require('http');
const UserModel = require('./models/User')
const Users = require('./data-sources.js/Users')
const { resolvers, typeDefs } = require('./schemas');
const { getUser } = require('./utils/auth');
const  path  = require('path');

async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);
  app.use(express.static(path.join(__dirname,"../client/build")))
  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      if (token) {
        const user = getUser(token);
        req.user = user
        return req
      }
      return req
    },
    dataSources: () => {
      return {
        users: new Users(UserModel)
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // More required logic for integrating with Express
 
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/graphql'
  });

  // app.get('*',(req,res) =>{
  //   res.sendFile(path.join(__dirname,"../client/build/index.html"))
  // })
  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
connect().then(() => {
  startApolloServer(typeDefs, resolvers).then().catch(console.error)
}).catch(console.error)
