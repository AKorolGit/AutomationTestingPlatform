import { IApiClient } from "@qa/core";
import { suppliersEndpoints } from "./SuppliersEndpoints";
import { SupplierDto } from "./dtos/SupplierDto";

export class SuppliersApi {
  constructor(private readonly apiClient: IApiClient) {}

  async getMySupplier(): Promise<SupplierDto> {
    return this.apiClient.get<SupplierDto>(suppliersEndpoints.my);
  }
}