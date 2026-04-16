import { fileType } from "elysia";
import { FileType } from "elysia/type-system/types";
import * as v from "valibot";

export const fileValidatorAsync = (sizeInMb: number, fileTypes: FileType | FileType[]) =>
	v.cacheAsync(
		v.pipeAsync(
			v.file(),
			v.maxSize(1024 * 1024 * sizeInMb, `Please select a file smaller than ${sizeInMb} MB.`),
			v.checkAsync(async (f) => fileType(f, fileTypes), "Invalid file type."),
		),
	);

const additionalValidators = {
	checkFileAsync: (fileTypes: FileType | FileType[], sizeInMb: number) =>
		v.pipeAsync(
			v.file(),
			v.checkAsync(async (f) => fileType(f as File, fileTypes), "Invalid file type."),
			v.maxSize(1024 * 1024 * sizeInMb, `File size exceeds ${sizeInMb} MB.`),
		),
};

export default additionalValidators;
