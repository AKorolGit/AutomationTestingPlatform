import { AzureAdLoginPage } from "./AzureAdLoginPage";
import { LoginPage } from "./LoginPage";

export class AzureAuthWorkflow{
    constructor(
        private readonly loginPage: LoginPage,
        private readonly azureAdLoginPage: AzureAdLoginPage
    ){}
    async login(email: string, password: string): Promise<void> {
        // await this.loginPage.clickLoginButton();
        await this.azureAdLoginPage.fillEmailField(email);
        await this.azureAdLoginPage.clickSubmitButton();
        await this.azureAdLoginPage.fillPasswordField(password);
        await this.azureAdLoginPage.clickSubmitButton();
        await this.azureAdLoginPage.clickStaySignedInButton();
        await this.loginPage.clickLoginButton();
    }
}