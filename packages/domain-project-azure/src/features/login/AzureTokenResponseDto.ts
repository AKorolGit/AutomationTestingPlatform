export interface AzureTokenResponseDto {
  token_type: string;
  scope: string;
  expires_in: number;
  access_token: string;
}