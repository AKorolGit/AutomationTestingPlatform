export interface IAuthWorkflow {
  login(email: string, password: string): Promise<void>;
}