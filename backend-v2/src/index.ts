import { Elysia, fileType } from "elysia";
import { CloudflareAdapter } from "elysia/adapter/cloudflare-worker";
import { authRoute } from "./modules/auth/route";
import { authMarco } from "./modules/auth/marco";

import * as v from "valibot";
import "@valibot/i18n/zh-TW";
import { env } from "cloudflare:workers";
import { FileType } from "elysia/type-system/types";
v.setGlobalConfig({ lang: "zh-TW" });

const fileValidator = (sizeInMb: number, fileTypes: FileType | FileType[]) =>
	v.cacheAsync(
		v.pipeAsync(
			v.file(),
			v.maxSize(1024 * 1024 * sizeInMb, `Please select a file smaller than ${sizeInMb} MB.`),
			v.checkAsync(async (f) => fileType(f, fileTypes), "Invalid file type."),
		),
	);

export default new Elysia({
	adapter: CloudflareAdapter,
})
	.use(authRoute)
	.use(authMarco)
	.get("/", ({ set }) => {
		set.headers["content-type"] = "text/html";
		return `
		<html>
		<body>
			<form method="post" action="/upload" enctype='multipart/form-data' >
				<input type="file" name="selected"/>
				<input name="d" value="123"/>
				<button type="submit">submit</button>
			</form>
		</body>
		</html>
		`;
	})
	.get(
		"/prot",
		({ user }) => {
			console.log("qweqweqwe");
		},
		{
			auth: true,
		},
	)
	.post(
		"/upload",
		async ({ body }) => {
			console.log(body.selected);
			const k = body.d;
			const result = await env.userAvatars.put(k, body.selected);
			console.log(await env.userAvatars.head(k), result);
			console.log(await env.userAvatars.list());
			console.log(await env.userAvatars.get(k));
			return (await env.userAvatars.get(k))?.blob();
		},
		{
			body: v.objectAsync({
				selected: fileValidator(10, ["image/jpeg", "image/png"]),
				d: v.string(),
			}),
		},
	)
	.compile();
