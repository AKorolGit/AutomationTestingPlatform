import { randomUUID } from 'crypto';
import { CreateRequestConsumptionDto, CreateRequestDto } from '../dtos/CreateRequestDto';
import { RequestConsumptionBuilder } from './RequestConsumptionBuilder';

export class CreateRequestBuilder {
  private consumptions: CreateRequestConsumptionDto[] = [];
  private comment = `Automated test — ${randomUUID()}`;

  withConsumption(builder: RequestConsumptionBuilder): this {
    this.consumptions.push(builder.build());
    return this;
  }

  build(): CreateRequestDto {
    return {
      createOnBehalfOfBrandOwner: true,
      consumptions: [...this.consumptions],
      comment: this.comment,
    };
  }
}