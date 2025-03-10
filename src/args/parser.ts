import { parseArgs } from "util";

export const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        help: {
            type: "boolean"
        },
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
