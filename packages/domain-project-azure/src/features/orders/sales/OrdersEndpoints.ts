const ordersBase = (segment: string) => `/ecohz-online/orders/${segment}`;

export const ordersEndpoints = {
    salesOrder: {
        base: ordersBase('sales'),
        list: `${ordersBase('sales')}/list`,
        byId: (id: number) => `${ordersBase('sales')}/${id}`,
    },
    sourcingOrder: {
        base: ordersBase('sourcing'),
        byId: (id: number) => `${ordersBase('sourcing')}/${id}`,
    },
} as const;