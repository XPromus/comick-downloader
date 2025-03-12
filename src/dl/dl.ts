import sizeOf from "buffer-image-size";
import type { Page } from "puppeteer";
import { getBlankPage } from "../cbz/blankPage";
import { createCbz } from "../cbz/creator";
import { getChapterReaderElement, getChapterImageURLs } from "./page/chapterDownload";
import axios from "axios";

export const chapterDownload = async (
    page: Page,
    outputPath: string,
    fileName: string
) => {
    const readerElement = await getChapterReaderElement(page);
    const imageURLs: string[] = await getChapterImageURLs(readerElement);

    const imageRequests = await axios.all(imageURLs.map((endpoint) => axios.get(endpoint, { responseType: "arraybuffer" })));
    const imageBuffers: Buffer[] = imageRequests.map((request) => {
        return Buffer.from(request.data);
    });

    const imageDimensions = sizeOf(imageBuffers[0]);
    const blankPage = await getBlankPage(imageDimensions.width, imageDimensions.height);
    imageBuffers.splice(1, 0, blankPage);

    createCbz(imageBuffers, outputPath, fileName);
}
