import fs from "fs";
import puppeteer from "puppeteer-extra";

import { Browser, Page } from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { getPage, setupBrowser } from "./dl/setup";
import { values } from "./args/parser";
import { getFilterUrl } from "./dl/web/urlConfig";
import { getChapterUrls } from "./dl/page/chapterIterator";
import { chapterDownload } from "./dl/dl";

/* 
1. Get all chapter URLs of series
2. Filter URLs by chapter Range (optional)
3. Download each chapter and save to .cbz
*/

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
    const filteredURLs: string[] = (values.chapterRange !== undefined) 
        ? filterChapterURLs(urls, getChapterRangeMinMax(values.chapterRange)) 
        : urls;
    console.log(filteredURLs.length);


    for (let index = 0; index < urls.length; index++) {
        console.log(`Current URL: ${urls[index]}`);
        await page.goto(urls[index]);
        await chapterDownload(page, outputPath, `${index}`);
    }

    await browser.close();
}

const filterChapterURLs = (
    urls: string[],
    minMax: { min: number, max: number}
): string[] => {
    //https://comick.io/comic/kimi-ni-todoke/VV2EM-chapter-0-en
    return urls.map((url) => {
        const splitURL = url.split("-");
        const chapterIndex: number = Number.parseInt(splitURL[splitURL.length - 2]);
        if (chapterIndex >= minMax.max && chapterIndex <= minMax.max) {
            return url;
        } else {
            return null;
        }
    }).filter(e => e !== null);
}

const getChapterRangeMinMax = (input: string): {min: number, max: number} => {
    const splitString = input.split("-");
    return { 
        min: Number.parseInt(splitString[0]), 
        max: Number.parseInt(splitString[1])
    };
}
