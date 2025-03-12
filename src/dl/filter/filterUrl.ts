export const getFilterUrl = (
    seriesName: string,
    language: string,
    group: string
): string => {
    return `https://comick.io/comic/${seriesName}?date-order=&chap-order=1&lang=${language}&group=${group}`;
}
