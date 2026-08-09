import { SalesOrderDto } from "./SalesOrderDto";

export interface SalesOrdersResponseDto {
  dataList: SalesOrderDto[];
  currentPage: number;
  dataListItemsIDs: number[];
  pageSize: number;
  totalItems: number
}