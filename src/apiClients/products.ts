import { AxiosResponse } from "axios";

import { AxiosClient } from "./axiosClient";
import { PRODUCTS_PATH, SHOP_SERVICE_URL } from "../config/constants";
import { Product } from "@tenderi-io/entity";

export class ProductsClient extends AxiosClient {
  constructor() {
    super(SHOP_SERVICE_URL);
  }

  public async getProducts(): Promise<AxiosResponse> {
    return await this.get(PRODUCTS_PATH);
  }

  public async retrieveProduct(id: string): Promise<any> {
    return await this.retrieve(PRODUCTS_PATH, id);
  }

  public async createProduct(product: Product): Promise<any> {
    return await this.post(PRODUCTS_PATH, product);
  }

  public async updateProduct(product: Product): Promise<any> {
    return await this.patch(PRODUCTS_PATH, product.id, product);
  }

  public async deleteProduct(id: string): Promise<any> {
    return await this.delete(PRODUCTS_PATH, id);
  }
}
