import { AxiosClient } from "../../apiClients/axiosClient";

export const resolvers = {
  Query: {
    async products(_, __, contextValue) {
      const productsRes = await contextValue.productsClient.getProducts();
      return productsRes.data;
    },
    async product(_, { id }, contextValue) {
      const productsRes = await contextValue.productsClient.retrieveProduct(id);
      return productsRes.data;
    },
  },
  Mutation: {
    async createProduct(_, product, contextValue) {
      const productsRes = await contextValue.productsClient.createProduct(product);
      return productsRes.data;
    },
    async updateProduct(_, product, contextValue) {
      const productsRes = await contextValue.productsClient.updateProduct(product);
      return productsRes.data;
    },
    async deleteProduct(_, { id }, contextValue) {
      const productsRes = await contextValue.productsClient.deleteProduct(id);
      return productsRes.data;
    },
  }
}
