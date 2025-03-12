import chalk from "chalk";
import { OutputFileType } from "typescript";

export const printHelp = () => {

console.log(`${chalk.bold("How to use comick-downloader:")}

    ${chalk.bold("Arguments:")}
    ${chalk.red("Mandatory Arguments")}, ${chalk.green("Optional Arguments")}

    ${chalk.green("--help")} | ${chalk.green("-h")} ${chalk.dim("<boolean>")}: 
    Print help

    ${chalk.red("--series")} | ${chalk.red("-s")} ${chalk.dim("<string>")}: 
    The name of the series, found in the URL of the series.

    ${chalk.red("--language")} | ${chalk.red("-l")} ${chalk.dim("<string>")}: 
    The language identifier, found in the URL of the series.

    ${chalk.red("--group")} | ${chalk.red("-g")} ${chalk.dim("<string>")}: 
    The name of the translation group, found in the URL of the series.

    ${chalk.red("--outputPath")} | ${chalk.red("-o")} ${chalk.dim("<string>")}: 
    Path to the output directory for the created .cbz files.

    ${chalk.green("--chapterRange")} | ${chalk.green("-c")} ${chalk.dim("<string>")}: 
    Syntax for range: ${chalk.yellow("\"1-20\"")}. The range of chapters, that should be downloaded. If left empty all chapters will be downloaded.

    ${chalk.green("--createXml")} | ${chalk.green("-x")} ${chalk.dim("<boolean>")}: 
    When present, a ComicInfo.xml file will be created with metadata.

    ${chalk.green("--retries")} | ${chalk.green("-r")} ${chalk.dim("<string>")}: 
    Syntax for the number of retries: ${chalk.yellow("\"5\"")}.Sets the number of retries that should be performed, if a Download failes. When not set, a default value of ${chalk.yellow("5")} will be set.


    ${chalk.bold("Example request:")}

    ${chalk.dim("|- bash -------------------------------------------------------------------------------------------------------------|")}
    ${chalk.dim("|")} ${chalk.bold("ck-dl")} ${chalk.italic("--series")} ${chalk.yellow("\"five-wallpapers-per-second\"")} ${chalk.italic("--language")} ${chalk.yellow("\"en\"")}  ${chalk.italic("--group")} ${chalk.yellow("\"no-hobbies-translation\"")}  ${chalk.italic("--outputPath")} ${chalk.yellow("\"~/bin/\"")} ${chalk.dim("|")}
    ${chalk.dim("|--------------------------------------------------------------------------------------------------------------------|")}
    
    Expected Output:
    |
    |-bin
        |- 1.cbz
        |- 2.cbz
        |- ...
        |- n+1.cbz
`);

    console.log("\n")

    printDisclaimer();
}

const printDisclaimer = () => {
console.log(`${chalk.bold("Disclaimer:")}
This software is still in development. Many thinks will probably break or not work correctly.
`)
}
