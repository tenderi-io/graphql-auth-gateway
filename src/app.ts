import express from 'express';
import morgan from 'morgan';
import gql from 'graphql-tag';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4'
import { readFileSync } from 'fs';

import AppDataSource from './db/config';
import { resolvers as adminResolvers } from './graphql/resolvers/adminResolvers';
import { Admin } from '@tenderi-io/entity';

const app = express();

export async function startApolloServer() {
  const typeDefs = gql(
    readFileSync(__dirname.concat('/graphql/schema/admin.graphql'), { 
      encoding: 'utf8' 
    })
  );
  const server  = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers: adminResolvers }),
  });
  await server.start();
  server.assertStarted("Apollo Server failed to start");
  app.use('/graphql', expressMiddleware(server, { 
    context: async ({ req, res }) => ({ 
      authorization: req.headers.authorization,
      adminRepository: AppDataSource.getRepository(Admin)
    })
  }));
}

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

export default app;
