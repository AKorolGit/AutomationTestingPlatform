import { IApiClient } from "@qa/core";
import { quoteRequestsEndpoints } from "@qa/domain-azure";
import { QuoteRequestDto } from "@qa/domain-azure";

export class QuoteRequestsApi {
  constructor(private readonly apiClient: IApiClient) {}

  async getByBoCodes(boCodes: string[]): Promise<QuoteRequestDto[]> {
    return this.apiClient.post<string[], QuoteRequestDto[]>(
      quoteRequestsEndpoints.getByBoCodes,
      boCodes
    );
  }
}