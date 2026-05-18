import * as fs from "node:fs";
import * as fsAsync from "node:fs/promises";
import * as path from "node:path";
import * as process from "node:process";
import { parseArgs } from "node:util";
import { rolldown } from "rolldown";
import { configuration } from "../src";
import { parsePath, run } from "./common";

const writeFile = async (directory: path.ParsedPath, name: string, content: Record<string, unknown>): Promise<void> => {
	const stringifiedContent = JSON.stringify(content);
	const filename = path.join(path.format(directory), name);

	await fsAsync.writeFile(filename, stringifiedContent, {
		encoding: "utf8",
		flag: "w",
	});
};

const buildConfiguration = async (): Promise<void> => {
	const {
		values: { target },
	} = parseArgs({
		allowPositionals: true,
		args: process.argv,
		options: {
			target: {
				type: "string",
				default: "./dist",
			},
		},
	});

	const targetPath = parsePath(target);
	if (targetPath == null) {
		throw new Error(`The target path "${target}" is not a valid path!`);
	}

	if (!fs.existsSync(path.format(targetPath))) {
		await fsAsync.mkdir(path.format(targetPath), { recursive: true });
	}

	await fsAsync.rm(path.resolve(path.format(targetPath)), { recursive: true, force: true });
	await fsAsync.mkdir(path.format(targetPath), {});

	await writeFile(targetPath, "tsconfig.json", configuration);
};

const buildScripts = async (): Promise<void> => {
	const bundle = await rolldown({
		input: path.join("src", "script", "init.ts"),
		external: ["node:fs", "node:fs/promises", "node:process", "node:util"],
	});

	await bundle.write({
		file: path.join("dist", "script", "init.js"),
		minify: true,
	});
};

const build = async (): Promise<void> => {
	await buildConfiguration();
	await buildScripts();
};

await run(build);
