import axios, { type AxiosInstance } from "axios";

export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("HTTP Error:", error);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  async post<TResponse, TData = any>(
    url: string,
    data?: TData
  ): Promise<TResponse> {
    const response = await this.client.post<TResponse>(url, data);
    return response.data;
  }

  async put<TResponse, TData = any>(url: string, data?: TData): Promise<TResponse> {
    const response = await this.client.put<TResponse>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}
