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

    async isHidden(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isHidden();
    }

    async waitForElement(selector: string, timeout?: number): Promise<void> {
        await this.page.locator(selector).waitFor({ timeout });
    }

    async isElementPresentWithin(selector: string, timeoutMs?: number): Promise<boolean> {
        try {
            await this.page.locator(selector).waitFor({ timeout: timeoutMs ?? 3000, state: 'visible' });
            return true;
        } catch {
            return false;
        }
    }

    async getAllLinks(containerSelector: string): Promise<{ text: string; href: string }[]> {
        const elements = await this.page.locator(`${containerSelector} a[href]`).all();
        const results: { text: string; href: string }[] = [];

        for (const el of elements) {
            const href = await el.getAttribute('href');
            const text = (await el.textContent())?.trim() ?? '';
            if (href) results.push({ text, href });
        }
        return results;
    }

    async clickByRole(role: string, name: string): Promise<void> {
        await this.page.getByRole(role as any, { name }).click();
    }
}