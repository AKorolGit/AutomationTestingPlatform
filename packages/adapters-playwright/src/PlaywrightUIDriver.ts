import { IUIDriver } from "@qa/core";
import type { Page } from '@playwright/test';

export class PlaywrightUIDriver implements IUIDriver{
    constructor(private readonly page: Page){};
   
    async click(selector: string): Promise<void> {
        await this.page.locator(selector).click();
    }

    async fill(selector: string, value: string): Promise<void> {
        await this.page.locator(selector).fill(value);
    }

    async getText(selector: string): Promise<string> {
        return (await this.page.locator(selector).textContent()) ?? '';
    }

    async isVisible(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isVisible();
    }

    async waitForElement(selector: string, timeout?: number): Promise<void> {
        await this.page.locator(selector).waitFor({ timeout });
    }

    async isElementPresentWithin(selector: string, timeout?: number): Promise<boolean> {
        try {
            await this.page.locator(selector).waitFor({ timeout });
            return true;
        } catch {
            return false;
        }
    }
}