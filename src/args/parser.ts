import { parseArgs } from "util";

export const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        help: {
            type: "boolean"
        },
        series: {
            type: "string"
        },
        language: {
            type: "string"
        },
        group: {
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
