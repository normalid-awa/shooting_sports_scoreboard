// This is script is to converge encore services in to single endpoint
import * as p from "http-proxy";
import * as http from "http";
import "dotenv/config";
import { env } from "process";

var proxy = p.default.createProxyServer({});

http.createServer(function (req, res) {
	console.time(req.url);
	try {
		if (req.url.startsWith("/api"))
			proxy.web(req, res, {
				target: env.DEV_API_ENDPOINT + req.url.replace("/api", ""),
				ignorePath: true,
				changeOrigin: true,
				hostRewrite: true,
				autoRewrite: true,
			});
		else if (req.url.startsWith("/objects"))
			proxy.web(req, res, {
				target:
					env.DEV_OBJECT_STORAGE_ENDPOINT +
					req.url.replace("/objects", ""),
				changeOrigin: true,
				ignorePath: true,
			});
		else {
			res.statusCode = 404;
			res.end();
		}
	} catch (e) {
		console.error(e);
	}
	console.timeEnd(req.url);
}).listen(parseInt(env.DEV_CONVERGED_PORT));
