import axios, { AxiosResponse } from 'axios';

export class AxiosClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  public async get(path: string): Promise<AxiosResponse> {
    return await axios.get(`${this.baseUrl}${path}`);
  }

  public async retrieve(path: string, id: string): Promise<AxiosResponse> {
    return await axios.get(`${this.baseUrl}${path}/${id}`);
  }

  public async post(path: string, data: any): Promise<AxiosResponse> {
    return await axios.post(`${this.baseUrl}${path}`, data);
  }

  public async patch(path: string, id: string, data: any): Promise<AxiosResponse> {
    return await axios.patch(`${this.baseUrl}${path}/${id}`, data);
  }

  public async delete(path: string, id: string): Promise<AxiosResponse> {
    return await axios.delete(`${this.baseUrl}${path}/${id}`);
  }
}
