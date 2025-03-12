import { parseArgs } from "util";

export const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        help: {
            type: "boolean",
            short: "h"
        },
        series: {
            type: "string",
            short: "s"
        },
        language: {
            type: "string",
            short: "l"
        },
        group: {
            type: "string",
            short: "g"
        },
        chapterRange: {
            type: "string",
            short: "c"
        },
        outputPath: {
            type: "string",
            short: "o"
        },
        createXml: {
            type: "boolean",
            short: "x"
        },
        retries: {
            type: "string",
            short: "r"
        }
    },
    strict: true,
    allowPositionals: true
});

export const getChapterRange = (): { min: number, max: number } => {
    const splitString = values.chapterRange!!.split("-");
    return {
        min: Number.parseInt(splitString[0]),
        max: Number.parseInt(splitString[1])
    };
}
