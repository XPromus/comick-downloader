import { XMLBuilder } from "fast-xml-parser";
import { Manga, PageType, type ComicInfoData } from "../types/comicInfoData"

export const createComicInfoXmlString = (input: ComicInfoData): string => {
    const builder = new XMLBuilder({
        arrayNodeName: "ComicInfo",
        attributeNamePrefix: "$",
        ignoreAttributes: false
    });
    return `
        <?xml version="1.0" encoding="utf-8"?>
        ${builder.build(input)}
    `;
}

export const createComicInfo = (
    pageCount: number
): ComicInfoData => {
    const comicInfo: ComicInfoData = {
        Title: "",
        Series: "",
        Number: "",
        Cound: 0,
        Volume: 0,
        Summary: "",
        Year: 0,
        Month: 0,
        Day: 0,
        Writer: "",
        Publisher: "",
        PageCount: 0,
        LanguageISO: "",
        Manga: Manga.YESANDRIGHTTOLEFT,
        Pages: {
            Page: []
        }
    }

    for (let index = 0; index < pageCount; index++) {
        const pageType = (index == 0) ? PageType.FRONTCOVER : PageType.STORY
        comicInfo.Pages.Page.push({
            "$image": index,
            "$pagetype": pageType
        });            
    }

    return comicInfo;
}
