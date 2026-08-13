import { IUIDriver } from "@qa/core";
import { quoteRequestDetailsPageSelectors } from "@qa/domain-azure";

export class QuoteRequestDetailsPage {
  constructor(private readonly driver: IUIDriver) {}

  async clickAddNewOrder(): Promise<void> {
    await this.driver.click(quoteRequestDetailsPageSelectors.addNewOrderButton);
  }

  async isVisibleAddNewOrder(): Promise<void> {
    await this.driver.isVisible(quoteRequestDetailsPageSelectors.addNewOrderButton);
  }
}