import Elysia from "elysia";
import { auth } from "./auth";
import { authMarco } from "./marco";
import * as v from "valibot";
import addtionalValidators from "@/validators";
import { env } from "cloudflare:workers";

export const authRoutes = new Elysia({
	prefix: "/auth",
})
	.use(authMarco)
	.post(
		"/uploadAvatar",
		async ({ body, user, request: { headers } }) => {
			const path = `userAvatars/${user.id}`;
			await env.publicBucket.put(path, body.avatar.stream());
			return await auth().api.updateUser({
				body: {
					image: env.PUBLIC_R2_ENDPOINT + "/" + path,
				},
				headers,
			});
		},
		{
			auth: true,
			body: v.objectAsync({
				avatar: v.pipeAsync(
					v.file(),
					addtionalValidators.checkFileAsync(["image/jpeg", "image/gif", "image/png"], 0.5),
				),
			}),
		},
	)
	.mount((res) => auth().handler(res));
