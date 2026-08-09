import { OrderLine } from "./OrderLineDto";

export interface SalesOrderDto {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  lines: OrderLine[]
}
