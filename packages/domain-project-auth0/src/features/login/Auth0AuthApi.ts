import { getRequiredEnv, IApiClient } from "@qa/core";
import { Auth0TokenResponseDto } from "./dtos/Auth0TokenResponseDto";

export class Auth0AuthApi {
  constructor(private readonly apiClient: IApiClient) {}

  async loginWithPassword(username: string, password: string): Promise<Auth0TokenResponseDto> {
    const tokenUrl = `https://${getRequiredEnv('AUTH0_DOMAIN')}/oauth/token`;

    return this.apiClient.postForm<Auth0TokenResponseDto>(tokenUrl, {
      grant_type: getRequiredEnv('AUTH0_GRANT_TYPE'),
      username,
      password,
      audience: getRequiredEnv('AUTH0_AUDIENCE'),
      client_id: getRequiredEnv('AUTH0_CLIENT_ID'),
      client_secret: getRequiredEnv('AUTH0_CLIENT_SECRET'),
    });
  }
}