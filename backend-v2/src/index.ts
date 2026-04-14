import { Elysia } from "elysia";
import { CloudflareAdapter } from "elysia/adapter/cloudflare-worker";
import { authRoute } from "./modules/auth/route";
import { authMarco } from "./modules/auth/marco";

export default new Elysia({
	adapter: CloudflareAdapter,
})
	.use(authRoute)
	.use(authMarco)
	.get("/", () => {
		console.info("qwe");

		return "awad";
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
	.compile();
