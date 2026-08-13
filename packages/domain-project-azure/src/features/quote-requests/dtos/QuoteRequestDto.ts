export interface QuoteRequestConsumptionDto {
  id: number;
  quoteRequestId: number;
  countryId: number;
  volume: number;
  year: number;
  countryName: string;
}

export interface QuoteRequestDto {
  id: number;
  supplierCompanyID: number;
  comment: string;
  brandOwnerCode: string;
  isRequestedForBrandOwner: boolean;
  brandOwnerName: string;
  salesOrderID: number | null;   
  quoteRequestConsumptions: QuoteRequestConsumptionDto[];
  [key: string]: unknown;
}