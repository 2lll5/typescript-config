import fs from "node:fs";
import fsAsync from "node:fs/promises";
import process from "node:process";
import { type ParseArgsOptionsConfig, parseArgs } from "node:util";
import { configuration } from "../index";

const options = {
	target: {
		type: "string",
		default: "tsconfig.json",
		multiple: false,
		short: "t",
	},
	help: {
		type: "boolean",
		default: false,
		multiple: false,
	},
} as const satisfies ParseArgsOptionsConfig;

const printHelp = (): void => {
	// biome-ignore-start lint/suspicious/noConsole: No need to bring a logger for this
	console.log("Description");
	console.log("\tInitialize a new TypeScript configuration file using the Cookielab TypeScript configuration");

	console.log("");

	console.log("Usage");
	console.log("\tnpx @cookielab.io/typescript-config init");
	console.log("\tnpx @cookielab.io/typescript-config init --target tsconfig.custom.json");

	console.log("");

	console.log("Options");
	console.log("\t--help\t\t\tShow help and usage");
	console.log('\t--target, -t\t\tThe target file to write the configuration into. Defaults to "tsconfig.json"');
	// biome-ignore-end lint/suspicious/noConsole: No need to bring a logger for this
};

const main = async (): Promise<void> => {
	const { target: rawTarget, help } = parseArgs({
		args: process.argv,
		allowNegative: false,
		allowPositionals: true,
		options: options,
	}).values;
	const target = rawTarget.trim();

	if (help) {
		return printHelp();
	}

	if (target.length === 0) {
		throw new Error("The target file name cannot be empty!");
	}

	if (fs.existsSync(target)) {
		throw new Error(
			`The target "${target}" file already exists! Either delete the target file or use a different name.`,
		);
	}

	await fsAsync.writeFile(target, JSON.stringify(configuration, null, 4), {
		encoding: "utf-8",
		flag: "w",
	});

	// biome-ignore lint/suspicious/noConsole: No need to bring a logger for this
	console.log(`Cookielab's TypeScript configuration was initialized in "${target}"`);
};

main().catch((error) => {
	// biome-ignore lint/suspicious/noConsole: No need to bring a logger for this
	console.error(error);

	process.exit(1);
});
