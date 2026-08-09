import { IUIDriver } from "@qa/core";
import { azureAuthSelectors } from "./LoginPageSelectors";

export class AzureAdLoginPage{
    constructor(private readonly driver: IUIDriver){}

    async isEmailFieldVisible(): Promise<boolean> {
        return this.driver.isVisible(azureAuthSelectors.emailInput);
    }

    async fillEmailField(value: string): Promise<void> {
        await this.driver.waitForElement(azureAuthSelectors.emailInput);
        await this.driver.fill(azureAuthSelectors.emailInput, value);
    }

    async isPasswordFieldVisible(): Promise<boolean> {
        return this.driver.isVisible(azureAuthSelectors.passwordInput);
    }

    async fillPasswordField(value: string): Promise<void> {
        await this.driver.fill(azureAuthSelectors.passwordInput, value);
    }

    async clickStaySignedInButton(): Promise<void> {
        await this.driver.click(azureAuthSelectors.staySignedInBtn);
    }

    async isStaySignedInButtonVisible(): Promise<boolean> {
        return this.driver.isVisible(azureAuthSelectors.staySignedInBtn);
    }

    async clickSubmitButton(): Promise<void> {
        await this.driver.click(azureAuthSelectors.submitButton);
    }
}