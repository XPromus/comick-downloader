import type { Page } from "puppeteer";
import { XPATH_CHAPTER_TABLE, XPATH_PAGE_NUMBER_CONTAINER } from "../web/xpathConfig";
import { getChapterListPageURL, URL_BASE } from "../web/urlConfig";

export const getChapterUrls = async (
    page: Page,
    seriesName: string,
    language: string,
    group: string
): Promise<string[]> => {
    const numberOfPages = await getNumberOfPages(page);
    console.log(numberOfPages);

    let returnList: string[] = [];

    for (let index = 0; index < numberOfPages; index++) {
        await page.goto(getChapterListPageURL(seriesName, language, group, index)); 
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        const urls = await getURLsFromTable(page);
        returnList = returnList.concat(urls);    
    }

    return convertToURL(returnList);
}

const getNumberOfPages = async (
    page: Page
): Promise<number> => {
    await page.waitForSelector(XPATH_PAGE_NUMBER_CONTAINER);
    const pageNumberContainer = await page.$(XPATH_PAGE_NUMBER_CONTAINER)!!;
    const text = await page.evaluate(el => el!!.textContent, pageNumberContainer);
    const numberOfPages = text!!.split("/")[1];
    return Number.parseInt(numberOfPages);
}

const getURLsFromTable = async (
    page: Page
): Promise<string[]> => {
    await page.waitForSelector(XPATH_CHAPTER_TABLE);
    const chapterTable = await page.$(XPATH_CHAPTER_TABLE)!!;
    return await chapterTable!!.$$eval("a", option => {
        return option.map(link => {
            return link.getAttribute("href");
        }).filter(x => x !== null);
    });
}

const convertToURL = (paths: string[]): string[] => {
    return paths.map((path) => {
        return `${URL_BASE}${path}`;
    })
}
