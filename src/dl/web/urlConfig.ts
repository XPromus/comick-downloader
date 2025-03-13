export const URL_BASE = "https://comick.io";

export const getChapterListPageURL = (
    seriesName: string,
    language: string,
    group: string,
    index: number
): string => {
    return `${URL_BASE}/comic/${seriesName}?date-order=&chap-order=1&lang=${language}&group=${group}&page=${index + 1}#chapter-header`
}

export const getFilterUrl = (
    seriesName: string,
    language: string,
    group: string
): string => {
    return `https://comick.io/comic/${seriesName}?date-order=&chap-order=1&lang=${language}&group=${group}`;
}
