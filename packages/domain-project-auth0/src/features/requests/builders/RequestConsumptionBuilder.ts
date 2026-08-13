import { randomUUID } from 'crypto';
import { CreateRequestConsumptionDto } from '@qa/domain-auth0';

export class RequestConsumptionBuilder {
  private consumption: CreateRequestConsumptionDto = {
    id: randomUUID(),
    year: 2026,
    countryId: 44,
    technologies: ['Wind', 'Solar'],
    volume: 34,
    additionalQualities: ['RE100'],
    age: 4,
    size: 4,
    allowOverride: true,
    beneficiaryName: 'NNT 1',
    irecBeneficiaryId: null,
    gecBeneficiaryId: null,
    gecNameCN: null,
    gecAddressEN: null,
    gecAddressCN: null,
    gecVatNumber: null,
    cancellationPurpose: 'Documentation of origin for electricity supply to end consumer.',
  };

  withVolume(volume: number): this {
    this.consumption.volume = volume;
    return this;
  }

  build(): CreateRequestConsumptionDto {
    return { ...this.consumption };
  }
}