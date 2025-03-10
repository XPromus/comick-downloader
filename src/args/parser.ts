import { parseArgs } from "util";

export const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        seriesUrl: {
            type: "string"
        },
        outputPath: {
            type: "string"
        }
    },
    strict: true,
    allowPositionals: true
});