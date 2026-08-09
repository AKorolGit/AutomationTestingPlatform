import { getRequiredEnv, IApiClient } from "@qa/core";
import { AzureTokenResponseDto } from "./AzureTokenResponseDto";

export class AzureAuthApi {
    constructor(private readonly apiClient: IApiClient) {}

    async loginWithPassword(username: string, password: string): Promise<AzureTokenResponseDto> {
        const tokenUrl = `https://login.microsoftonline.com/ecohz.onmicrosoft.com/oauth2/v2.0/token`;

        return this.apiClient.postForm<AzureTokenResponseDto>(
            tokenUrl, 
            {
                grant_type: getRequiredEnv('AZURE_GRANT_TYPE'),
                client_id: getRequiredEnv('AZURE_CLIENT_ID'),
                scope: getRequiredEnv('AZURE_API_SCOPE'),
                client_secret: getRequiredEnv('AZURE_CLIENT_SECRET'),
                username,
                password    
            },
            {
                Tenant: getRequiredEnv('AZURE_TENANT_ID'),
            }
        );
    }
}