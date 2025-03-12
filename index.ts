import axiosRetry from "axios-retry";
import { values } from "./src/args/parser";
import { execute } from "./src/exec";
import { printHelp } from "./src/help/help";
import axios from "axios";
import { DEFAULT_RETRIES } from "./src/config/config";

const retries = values.retries !== undefined ? Number.parseInt(values.retries) : DEFAULT_RETRIES;
axiosRetry(axios, { retries: retries, retryDelay: axiosRetry.exponentialDelay });

if (values.help) {
    printHelp();
} else {
    await execute();
}
