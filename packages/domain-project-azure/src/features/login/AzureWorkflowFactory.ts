import { IUIDriver } from "@qa/core";
import { AzureAdLoginPage } from "@qa/domain-azure";
import { AzureAuthWorkflow } from "@qa/domain-azure";
import { LoginPage } from "./LoginPage";

export class AzureWorkflowFactory {
  static create(driver: IUIDriver): AzureAuthWorkflow {
    const loginPage = new LoginPage(driver);
    const azureAdLoginPage = new AzureAdLoginPage(driver);
    return new AzureAuthWorkflow(loginPage, azureAdLoginPage);
  }
}