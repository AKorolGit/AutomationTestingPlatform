export interface IApiClient {
    get<T>(url: string): Promise<T>;
    post<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse>;
    postForm<TResponse>(url: string, form: Record<string, string>, headers?: Record<string, string>): Promise<TResponse>;
}