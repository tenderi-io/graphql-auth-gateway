import { Express } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { Repository } from 'typeorm';
import { Admin, Product } from '@tenderi-io/entity';

import AppDataSource from '../config/db';
import { AxiosClient } from '../apiClients/axiosClient';
import { ProductsClient } from '../apiClients/products';
import { adminSchema, productSchema } from '../graphql/schema';
import { adminResolvers, productsResolvers } from '../graphql/resolvers';
import { buildSubgraphSchema } from '@apollo/subgraph';

const mergedTypeDefs = mergeTypeDefs([adminSchema, productSchema]);
const mergedResolvers = mergeResolvers([adminResolvers, productsResolvers]);

interface IContext {
  authorization: string | undefined;
  adminRepository: Repository<Admin>;
  productsClient: ProductsClient;
};

export async function startApolloServer(app: Express) {
  const server  = new ApolloServer<IContext>({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
  });
  // Test axios client
  // const axiosClient = new AxiosClient('http://0.0.0.0:3350/api/v1')
  // const response = await axiosClient.get('/products');
  // console.log(response.status);
  await server.start();
  server.assertStarted("Apollo Server failed to start");
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req, res }) => ({ 
      authorization: req.headers.authorization,
      adminRepository: AppDataSource.getRepository(Admin),
      productsClient: new ProductsClient(),
    }),
  }));
};
