export interface SearchByPropertyDto {
  propertyName: string;
}

export interface OrderFilterDto {
  propertyName: string;
  filterType: string;
}

export interface SalesOrdersRequestDto {
  page: number;
  search: string;
  dir: 'asc' | 'desc';
  sort: string;
  invoiceStatuses: number[];
  orderStatuses: number[];
  budgetYear: (number | null)[];
  clientTimeZone: string;
  size: number;
  tab: number;
  status: number;
  statusCombiner: 'OR' | 'AND';
  certificateType: string | null;
  orderListType: string;
  selectedItems: boolean;
  filters: OrderFilterDto[];
  searchByProperties: SearchByPropertyDto[];
}