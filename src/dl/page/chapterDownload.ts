import type { ElementHandle, Page } from "puppeteer";
import { readerSectionID } from "../../config/config";
import axios from "axios";

export const getChapterReaderElement = async (
    page: Page
): Promise<ElementHandle<Element>> | never => {
    const readerElement = (await page.$(readerSectionID));
    if (readerElement !== null) {
        return readerElement;
    } 

    throw new Error(`Element with id ${readerSectionID} could not be found`);
}

export const getChapterImageURLs = async (
    readerElement: ElementHandle<Element>
): Promise<string[]> => {
    return await readerElement!!.$$eval("img", option => {
        return option.map(image => {
            return image.getAttribute("src")
        }).filter(x => x !== null);
    });
}

export const getChapterImageBuffers = async (
    url: string
): Promise<Buffer> => {
    const response = await axios.get(url, {
        responseType: "arraybuffer"
    });
    return Buffer.from(response.data);
}
