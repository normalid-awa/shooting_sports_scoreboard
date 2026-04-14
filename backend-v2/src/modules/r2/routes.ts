import { env } from "cloudflare:workers";
import Elysia from "elysia";

export const r2Routes = new Elysia({ prefix: "r2" })
	.get("/*", async ({ params, status, set }) => {
		const key = params["*"];
		const file = await env.publicBucket.get(key);
		if (!file) return status(404);
		set.headers.etag = file.httpEtag;
		return file.blob();
	})
	.head("/*", async ({ params, status, set }) => {
		const key = params["*"];
		const file = await env.publicBucket.head(key);
		if (!file) return status(404);
		set.headers.etag = file.httpEtag;
	});
