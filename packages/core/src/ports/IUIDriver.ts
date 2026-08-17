export interface IUIDriver {
    click(selector: string): Promise<void>;
    fill(selector: string, value: string): Promise<void>;
    getText(selector: string): Promise<string>;
    isVisible(selector: string): Promise<boolean>;
    isHidden(selector: string): Promise<boolean>;
    waitForElement(selector: string, timeoutMs?: number): Promise<void>;
    isElementPresentWithin(selector: string, timeout?: number): Promise<boolean>;
    getAllLinks(containerSelector: string): Promise<{ text: string; href: string }[]>;
    clickByRole(role: string, name: string): Promise<void>;
}