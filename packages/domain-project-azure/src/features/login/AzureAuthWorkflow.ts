import { IAuthWorkflow } from "@qa/core";
import { AzureAdLoginPage } from "@qa/domain-azure";
import { LoginPage } from "@qa/domain-azure";

export class AzureAuthWorkflow implements IAuthWorkflow {
    constructor(
        private readonly loginPage: LoginPage,
        private readonly azureAdLoginPage: AzureAdLoginPage
    ){}
    async login(email: string, password: string): Promise<void> {
        await this.azureAdLoginPage.fillEmailField(email);
        await this.azureAdLoginPage.clickSubmitButton();
        await this.azureAdLoginPage.fillPasswordField(password);
        await this.azureAdLoginPage.clickSubmitButton();
        await this.azureAdLoginPage.clickStaySignedInButton();
        await this.loginPage.clickLoginButton();
    }
}