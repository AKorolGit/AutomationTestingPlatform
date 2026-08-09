import { IApiClient } from "@qa/core";
import { ordersEndpoints } from "./OrdersEndpoints";
import { SalesOrderDto } from "./dtos/SalesOrderDto";
import { SalesOrdersRequestDto } from "./dtos/SalesOrdersRequestDto";
import { SalesOrdersResponseDto } from "./dtos/SalesOrdersResponseDto";

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