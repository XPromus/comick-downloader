import { values } from "./src/args/parser";
import { execute } from "./src/exec";
import { printHelp } from "./src/help/help";

if (values.help) {
    printHelp();
} else {
    await execute();
}
