import { IUIDriver } from "@qa/core";
import { navigationSelectors } from "./NavigationSelectors";

export class NavigationMenu {
    constructor(private readonly driver: IUIDriver) {}

    async goToCompanies(): Promise<void> {
        await this.driver.click(navigationSelectors.companies);
    }

    async goToSalesOrders(): Promise<void> {
        await this.expandIfNeeded(navigationSelectors.salesSectionToggle, navigationSelectors.salesOrders);
        await this.driver.click(navigationSelectors.salesOrders);
    }

    private async expandIfNeeded(toggleSelector: string, childSelector: string): Promise<void> {
        const alreadyVisible = await this.driver.isVisible(childSelector);
        if (!alreadyVisible) {
        await this.driver.click(toggleSelector);
        await this.driver.waitForElement(childSelector);
        }
    }

    async getAllPageLinks(): Promise<{ text: string; href: string }[]> {
        return this.driver.getAllLinks(navigationSelectors.menuContainer);
    }
}