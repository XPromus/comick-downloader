import fs from "fs";
import puppeteer from "puppeteer-extra";

import { Browser, Page } from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { downloadImageToBuffer, getChapterImages, getChapterReaderElement } from "./dl/chapterDownload";
import { getPage, setupBrowser } from "./dl/setup";
import { values } from "./args/parser";
import { createCbz } from "./cbz/creator";
import sizeOf from "buffer-image-size";
import { getBlankPage } from "./cbz/blankPage";

export const execute = async () => {
    puppeteer.use(StealthPlugin());

    const targetURL: string = values.seriesUrl!!;
    const outputPath: string = values.outputPath!!;
    
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }
    
    const browser: Browser = await setupBrowser();
    const page: Page = await getPage(browser, targetURL);
    
    const readerElement = await getChapterReaderElement(page);
    const imageURLs: string[] = await getChapterImages(readerElement);
    const imageBuffers: Buffer[] = await Promise.all(imageURLs.map(async (url): Promise<Buffer> => {
        return await downloadImageToBuffer(url);
    }));
    
    const imageDimensions = sizeOf(imageBuffers[0]);
    const blankPage = await getBlankPage(imageDimensions.width, imageDimensions.height);
    imageBuffers.splice(1, 0, blankPage);
    
    await browser.close();
    
    createCbz(imageBuffers, outputPath);
}