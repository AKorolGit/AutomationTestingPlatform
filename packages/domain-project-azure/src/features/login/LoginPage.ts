import { IUIDriver } from "@qa/core";
import { azureAuthSelectors } from "./LoginPageSelectors";

export class LoginPage{
    constructor(private readonly driver: IUIDriver){}

    async clickLoginButton(): Promise<void> {
        await this.driver.click(azureAuthSelectors.loginButton);
    }

    async isLoginButtonVisible(): Promise<boolean> {
        return this.driver.isVisible(azureAuthSelectors.loginButton);
    }

    async clickSubmitButton(): Promise<void> {
        await this.driver.click(azureAuthSelectors.submitButton);
    }
}