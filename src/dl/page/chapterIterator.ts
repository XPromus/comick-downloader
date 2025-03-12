import type { Page } from "puppeteer";

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
        const targetURL = `https://comick.io/comic/${seriesName}?date-order=&chap-order=1&lang=${language}&group=${group}&page=${index + 1}#chapter-header`;

        await page.goto(targetURL); 
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
    const pageNumberContainer = await page.$("xpath//html/body/div/main/div[2]/div/div[2]/div/div[2]/strong[3]");
    const text = await page.evaluate(el => el!!.textContent, pageNumberContainer);
    const numberOfPages = text!!.split("/")[1];
    return Number.parseInt(numberOfPages);
}

const getURLsFromTable = async (
    page: Page
): Promise<string[]> => {
    const chapterTable = await page.$("xpath//html/body/div/main/div[2]/div/div[2]/div/div[3]/table/tbody");
    return await chapterTable!!.$$eval("a", option => {
        return option.map(link => {
            return link.getAttribute("href");
        }).filter(x => x !== null);
    });
}

const convertToURL = (paths: string[]): string[] => {
    return paths.map((path) => {
        return `https://comick.io${path}`;
    })
}
