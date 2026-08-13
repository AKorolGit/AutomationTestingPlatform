import { IUIDriver } from "@qa/core";
import { requestsPageSelectors } from "./RequestsPageSelectors";

export class RequestsPage {
  constructor(private readonly driver: IUIDriver) {}

  async isLoaded(): Promise<boolean> {
    await this.driver.waitForElement(requestsPageSelectors.requestsTable);
    return this.driver.isVisible(requestsPageSelectors.requestsTable);
  }

  async isRequestVisible(requestNumber: number): Promise<boolean> {
    return this.driver.isVisible(requestsPageSelectors.requestNumberCell(requestNumber));
  }
}