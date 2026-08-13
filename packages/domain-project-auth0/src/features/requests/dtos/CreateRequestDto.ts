export interface CreateRequestConsumptionDto {
  id: string;
  year: number;
  countryId: number;
  technologies: string[];
  volume: number;
  additionalQualities: string[];
  age: number;
  size: number;
  allowOverride: boolean;
  beneficiaryName: string;
  irecBeneficiaryId: number | null;
  gecBeneficiaryId: number | null;
  gecNameCN: string | null;
  gecAddressEN: string | null;
  gecAddressCN: string | null;
  gecVatNumber: string | null;
  cancellationPurpose: string;
}

export interface CreateRequestDto {
  createOnBehalfOfBrandOwner: boolean;
  consumptions: CreateRequestConsumptionDto[];
  comment: string;
}

export type CreateRequestResponseDto = number; 