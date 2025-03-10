import { parseArgs } from "util";

export const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        seriesUrl: {
            type: "string"
        },
        outputPath: {
            type: "string"
        },
        createXml: {
            type: "boolean"
        }
    },
    strict: true,
    allowPositionals: true
});