export interface SupplyChainAssignment {
  companyId: number;
  role: string;
  ownerCode: string;
  companyHsId: number;
  contactHsId: number | null;
  contactUmId: number | null;
  companyCreatedAt: string;
  companyArchivedAt: string | null;
  companyCreatedBy: string;
  companyArchivedBy: string | null;
  contactCreatedAt: string;
  contactCreatedBy: string;
  language: string;
}