import { IUIDriver } from "@qa/core";
import { companiesPageSelectors } from "./CompaniesPageSelectors";

export class CompaniesPage {
  constructor(private readonly driver: IUIDriver) {}

  async clickCreateNew(): Promise<void> {
    await this.driver.click(companiesPageSelectors.createNewButton);
  }
}