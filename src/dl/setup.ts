import puppeteer from "puppeteer-extra";
import type { Browser, Page } from "puppeteer";

export const setupBrowser = async (): Promise<Browser> => {
    return await puppeteer.launch();
}

export const getPage = async (
    browser: Browser,
    url: string
): Promise<Page> => {
    const page: Page = await browser.newPage();

    await page.goto(url);
    await page.setViewport({
        width: 1080,
        height: 1024
    });

    await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight)
    });

    return page;
}
