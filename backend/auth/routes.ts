import { api } from "encore.dev/api";
import { auth } from "./auth";
import { getAuthData } from "~encore/auth";
import { userAvatars } from "./encore.service";
import log from "encore.dev/log";
import transformObjectStoreUrl from "../lib/transformObjectStoreUrl";
import orm from "./database";

export const authRoutes = api.raw(
	{ expose: true, path: "/auth/*path", method: "*" },
	async (req, res) => {
		const chunks: Buffer[] = [];
		for await (const chunk of req) {
			chunks.push(chunk);
		}
		const body = Buffer.concat(chunks);

		// Build a Web Request from the Node.js request
		const headers = new Headers();
		for (const [key, value] of Object.entries(req.headers)) {
			if (value)
				headers.append(
					key,
					Array.isArray(value) ? value.join(", ") : value,
				);
		}

		const url = `http://${req.headers.host}${req.url}`;
		const webReq = new Request(url, {
			method: req.method,
			headers,
			body: ["GET", "HEAD"].includes(req.method || "") ? undefined : body,
		});

		// Pass to Better Auth and forward the response
		const response = await auth.handler(webReq);

		response.headers.forEach((value, key) => {
			res.setHeader(key, value);
		});
		res.writeHead(response.status);
		res.end(await response.text());
	},
);

export const uploadAvatar = api(
	{
		expose: true,
		auth: true,
		method: "POST",
		path: "/auth/uploadAvatar",
	},
	async (): Promise<{ uploadUrl: string; viewUrl: string }> => {
		const { user, rawCookie } = getAuthData()!;
		const uploadUrl = await userAvatars.signedUploadUrl(user.id, {
			ttl: 30,
		});
		const url = transformObjectStoreUrl(userAvatars.publicUrl(user.id));
		log.info(`Generated signed URL for user ${user.id} to upload avatar`);
		log.info(`Avatar URL for user ${user.id}: ${url}`);
		await auth.api.updateUser({
			body: {
				image: url,
			},
			headers: {
				Cookie: rawCookie,
			},
		});
		return { uploadUrl: uploadUrl.url, viewUrl: url };
	},
);
