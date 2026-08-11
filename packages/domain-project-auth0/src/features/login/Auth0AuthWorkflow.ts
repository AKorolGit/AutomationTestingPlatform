import { IAuthWorkflow } from "@qa/core";
import { Auth0LoginPage } from "./Auth0LoginPage";

export class Auth0AuthWorkflow implements IAuthWorkflow {
    constructor(private readonly loginPage: Auth0LoginPage) {}

    async login(email: string, password: string): Promise<void> {
        await this.loginPage.fillEmailField(email);
        await this.loginPage.fillPasswordField(password);
        await this.loginPage.clickSubmitButton();
    }
}