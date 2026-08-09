import { SalesOrdersRequestDto } from "../sales/dtos/SalesOrdersRequestDto";

export class SalesOrdersRequestBuilder {
  private request: SalesOrdersRequestDto = {
    page: 0,
    search: '',
    dir: 'desc',
    sort: 'id',
    invoiceStatuses: [],
    orderStatuses: [],
    budgetYear: [null, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037],
    clientTimeZone: 'Europe/Madrid',
    size: 25,
    tab: 0,
    status: -1,
    statusCombiner: 'OR',
    certificateType: null,
    orderListType: 'orders',
    selectedItems: false,
    filters: [],
    searchByProperties: [{ propertyName: 'Any' }],
  };

  withPage(page: number): this {
    this.request.page = page;
    return this;
  }

  withSize(size: number): this {
    this.request.size = size;
    return this;
  }

  withSearch(search: string): this {
    this.request.search = search;
    return this;
  }

  withStatus(status: number): this {
    this.request.status = status;
    return this;
  }

  build(): SalesOrdersRequestDto {
    return { ...this.request };
  }
}