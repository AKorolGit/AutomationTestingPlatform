export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
    public readonly body?: string,
  ) {
    super(`API request failed: ${status} ${url}${body ? ` — ${body}` : ''}`);
    this.name = 'ApiError';
  }
}