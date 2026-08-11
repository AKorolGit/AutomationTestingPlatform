import { IApiClient, IUIDriver } from "@qa/core";
import { ordersEndpoints } from "./OrdersEndpoints";
import { SalesOrderDto } from "./dtos/SalesOrderDto";
import { SalesOrdersRequestDto } from "./dtos/SalesOrdersRequestDto";
import { SalesOrdersResponseDto } from "./dtos/SalesOrdersResponseDto";
import { salesOrdersPageSelectors } from "./SalesOrdersPageSelectors";


export class SalesOrdersApi {
   constructor(private readonly apiClient: IApiClient) {}

   async getSalesOrders(request: SalesOrdersRequestDto): Promise<SalesOrdersResponseDto> {
      return this.apiClient.post<SalesOrdersRequestDto, SalesOrdersResponseDto>(
         ordersEndpoints.salesOrder.list,
         request
      );
   }

   async getSalesOrder(id: number): Promise<SalesOrderDto> {
      return this.apiClient.get<SalesOrderDto>(ordersEndpoints.salesOrder.byId(id));
   }
}

export class SalesOrdersPage {
  constructor(private readonly driver: IUIDriver) {}

  async isLoaded(): Promise<boolean> {
    await this.driver.waitForElement(salesOrdersPageSelectors.pageContainer);
    return this.driver.isVisible(salesOrdersPageSelectors.pageContainer);
  }
}