import { IUIDriver } from "@qa/core";
import { Auth0AuthWorkflow, Auth0LoginPage } from "@qa/domain-auth0";

export class Auth0WorkflowFactory {
    static create(driver: IUIDriver): Auth0AuthWorkflow {
        const loginPage = new Auth0LoginPage(driver);
        return new Auth0AuthWorkflow(loginPage);
    }
}