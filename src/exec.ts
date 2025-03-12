import fs from "fs";
import puppeteer from "puppeteer-extra";

import { Browser, Page } from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { getPage, setupBrowser } from "./dl/setup";
import { values } from "./args/parser";
import { getFilterUrl } from "./dl/filter/filterUrl";
import { getChapterUrls } from "./dl/page/chapterIterator";
import { chapterDownload } from "./dl/dl";

export const execute = async () => {
    puppeteer.use(StealthPlugin());

    const outputPath: string = values.outputPath!!;
    const series: string = values.series!!;
    const language: string = values.language!!;
    const group: string = values.group!!;

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    const targetSeriesUrl = getFilterUrl(
        series, language, group
    );
    console.log(`Series URL: ${targetSeriesUrl}`);

    const browser: Browser = await setupBrowser();
    const page: Page = await getPage(browser, targetSeriesUrl);

    const urls: string[] = await getChapterUrls(page, series, language, group);
    
    for (let index = 0; index < urls.length; index++) {
        console.log(`Current URL: ${urls[index]}`);
        await page.goto(urls[index]);
        await chapterDownload(page, outputPath, `${index}`);
    }

    await browser.close();
}
