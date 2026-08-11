import { IUIDriver } from "@qa/core";
import { auth0LoginSelectors } from "@qa/domain-auth0";

export class Auth0LoginPage {
    constructor(private readonly driver: IUIDriver) {}

    async isEmailFieldVisible(): Promise<boolean> {
        return this.driver.isVisible(auth0LoginSelectors.emailInput);
    }

    async fillEmailField(value: string): Promise<void> {
        await this.driver.waitForElement(auth0LoginSelectors.emailInput);
        await this.driver.fill(auth0LoginSelectors.emailInput, value);
    }

    async fillPasswordField(value: string): Promise<void> {
        await this.driver.fill(auth0LoginSelectors.passwordInput, value);
    }

    async clickSubmitButton(): Promise<void> {
        await this.driver.click(auth0LoginSelectors.submitButton);
    }

    async clickResetPassword(): Promise<void> {
        await this.driver.click(auth0LoginSelectors.resetPassword);
    }
}