import { fileType } from "elysia";
import { FileType } from "elysia/type-system/types";
import * as valibot from "valibot";

export const fileValidatorAsync = (sizeInMb: number, fileTypes: FileType | FileType[]) =>
	valibot.cacheAsync(
		valibot.pipeAsync(
			valibot.file(),
			valibot.maxSize(1024 * 1024 * sizeInMb, `Please select a file smaller than ${sizeInMb} MB.`),
			valibot.checkAsync(async (f) => fileType(f, fileTypes), "Invalid file type."),
		),
	);

const v = {
	...valibot,
	checkFileAsync: (fileTypes: FileType | FileType[], sizeInMb: number) =>
		valibot.pipeAsync(
			v.file(),
			valibot.checkAsync(async (f) => fileType(f as File, fileTypes), "Invalid file type."),
			valibot.maxSize(1024 * 1024 * sizeInMb, `File size exceeds ${sizeInMb} MB.`),
		),
};

export default v;
