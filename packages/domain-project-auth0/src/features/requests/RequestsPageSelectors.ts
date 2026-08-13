export const requestsPageSelectors = {
    requestsTable: '.requests-table',
    requestNumberCell: (requestNumber: number) => `td[title="${requestNumber}"]`,
} as const;