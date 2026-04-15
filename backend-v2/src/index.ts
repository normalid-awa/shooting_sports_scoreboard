import { Elysia } from "elysia";
import { CloudflareAdapter } from "elysia/adapter/cloudflare-worker";
import { authRoutes } from "./modules/auth/routes";
import { authMarco } from "./modules/auth/marco";
import "@valibot/i18n/zh-TW";
import { env } from "cloudflare:workers";
import v from "./validators";
import { r2Routes } from "./modules/r2/routes";

v.setGlobalConfig({ lang: "zh-TW" });

export default new Elysia({
	adapter: CloudflareAdapter,
})
	.use(authRoutes)
	.use(r2Routes)
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
			<img src="/r2/public/test/123"/>
			<img src="/r2/public/test/123"/>
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
			const result = await env.publicBucket.put(`public/test/${k}`, body.selected);
			console.log(await env.publicBucket.head(k), result);
			console.log(await env.publicBucket.list());
			console.log(await env.publicBucket.get(k));
			return (await env.publicBucket.get(k))?.blob();
		},
		{
			body: v.objectAsync({
				selected: v.pipeAsync(
					v.file(),
					v.checkFileAsync(["image/jpeg", "image/gif", "image/png"], 10),
				),
				d: v.string(),
			}),
		},
	)
	.compile();
