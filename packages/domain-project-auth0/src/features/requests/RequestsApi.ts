import { IApiClient } from "@qa/core";
import { CreateRequestDto, CreateRequestResponseDto } from "@qa/domain-auth0";
import { requestsEndpoints } from "@qa/domain-auth0";

export class RequestsApi {
  constructor(private readonly apiClient: IApiClient) {}

  async createRequest(request: CreateRequestDto): Promise<CreateRequestResponseDto> {
    return this.apiClient.post<CreateRequestDto, CreateRequestResponseDto>(
      requestsEndpoints.create,
      request
    );
  }
}