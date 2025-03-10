export type ComicInfoData = {
    Title: string,
    Series: string,
    Number: string,
    Cound: number,
    Volume: number,
    Summary: string,
    Year: number,
    Month: number,
    Day: number,
    Writer: string,
    Publisher: string,
    PageCount: number,
    LanguageISO: string,
    Manga: Manga,
    Pages: {
        Page: Page[]
    }
}

export enum YesNo {
    UNKNOWN = "Unknown",
    NO = "No",
    YES = "Yes"
}

export enum Manga {
    UNKNOWN = "Unknown",
    NO = "No",
    YES = "Yes",
    YESANDRIGHTTOLEFT = "YesAndRightToLeft"
}

export type Page = {
    $image: number,
    $pagetype: PageType
}

export enum PageType {
    FRONTCOVER = "FrontCover",
    INNERCOVER = "InnerCover",
    ROUNDUP = "Roundup",
    STORY = "Story",
    ADVERTISMENT = "Advertisment",
    EDITORIAL = "Editorial",
    LETTERS = "Letters",
    PREVIEW = "Preview",
    BACKCOVER = "BackCover",
    OTHER = "Other",
    DELETED = "Deleted"
}
