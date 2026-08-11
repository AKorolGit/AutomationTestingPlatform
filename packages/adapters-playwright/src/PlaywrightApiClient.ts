import { APIRequestContext, APIResponse } from "@playwright/test";
import { IApiClient, ApiError } from "@qa/core";

export class PlaywrightApiClient implements IApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const response = await this.request.get(url, { headers });
    return this.parseResponse<T>(response, url);
  }

  async post<TRequest, TResponse>(url: string, body: TRequest, headers?: Record<string, string>): Promise<TResponse> {
    const response = await this.request.post(url, { data: body, headers });
    return this.parseResponse<TResponse>(response, url);
  }

  async postForm<TResponse>(url: string, form: Record<string, string>, headers?: Record<string, string>): Promise<TResponse> {
    const response = await this.request.post(url, { form, headers });
    return this.parseResponse<TResponse>(response, url);
  }

  private async parseResponse<T>(response: APIResponse, url: string): Promise<T> {
    console.log('status:', response.status());
    console.log('final URL:', response.url());
    if (!response.ok()) {
        const body = await response.text();
        throw new ApiError(response.status(), url, body);
      }
      return response.json() as Promise<T>;
  }
}