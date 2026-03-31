import { api } from "encore.dev/api";
import * as p from "http-proxy";
import { env } from "../env";

const proxyServer = (
	p as unknown as { default: typeof p }
).default.createProxyServer({});

export const proxy = api.raw(
	{
		expose: true,
		method: "*",
		path: "/objects/*path",
	},
	async (req, res) => {
		proxyServer.web(req, res, {
			target:
				env.OBJECT_STORAGE_ENDPOINT +
				(req.url || "").replace("/objects", ""),
			changeOrigin: true,
			ignorePath: true,
		});
	},
);
