const cors = require('cors');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const LaunchAPI = require('./datasources/launch');
const SQLDatabase = require('./datasources/mssqldb');

const port = 8000;

const app = express();
app.use(cors());


const knexConfig = {
    client: "mssql",
    connection: {
        host : 'localhost',
        user : 'graphql',
        password : '123',
        database : 'SimpleHRM'
    }
  };


const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const dataSources = () =>  ({
    launchAPI: new LaunchAPI(),
    SQLDatabase: new SQLDatabase(knexConfig)
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    playground: true,
    introspection: true
});
   
server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: port }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});