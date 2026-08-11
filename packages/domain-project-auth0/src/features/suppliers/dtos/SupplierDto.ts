export interface SignatoryDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface AcceptedTermsDto {
  version: string;
  acceptedBy: string;
  acceptedByUmContactPersonId: number;
  acceptanceDate: string;
  ownerCode: string;
}

export interface ContactPersonDto {
  userManagementId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  emailLanguageCode: string;
}

export interface CountryDto {
  id: number;
  displayName: string;
  isoCode2: string;
  certificateTypeId: number;
}

export interface SupplierDto {
  id: number;
  hubspotCompanyId: number;
  umCompanyId: number;
  name: string;
  countryId: number;
  customFields: Record<string, string>;
  organizationNumber: string;
  invoiceEmails: string[];
  signatories: SignatoryDto[];
  city: string;
  zipCode: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  isSetupCompleted: boolean;
  isVirtualBrandOwnerSupplier: boolean;
  supplierOwnerMapId: number;
  tag: string;
  ownerCode: string;
  archivedAt: string | null;
  createdAt: string;
  isArchived: boolean;
  acceptedTermsAndConditions: AcceptedTermsDto[];
  acceptedTermsAndConditionsForOwner: AcceptedTermsDto;
  contactPerson: ContactPersonDto;
  country: CountryDto;
  entityID: string;
  entityDisplayName: string;
}