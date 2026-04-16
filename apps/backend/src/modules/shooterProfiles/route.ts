import { ormMarco } from "@/database/marcos";
import { shooterProfiles } from "@/database/schemas/shooterProfiles";
import { eq } from "drizzle-orm";
import Elysia from "elysia";
import * as v from "valibot";

export const shooterProfilesRoute = new Elysia({
	prefix: "shooter-profiles",
})
	.use(ormMarco)
	.get(
		"/:id",
		async ({ params: { id }, orm, status }) => {
			const result = await orm
				.select()
				.from(shooterProfiles)
				.where(eq(shooterProfiles.id, id));
			if (result.length === 0) return status(404);
			return result[0];
		},
		{
			params: v.object({
				id: v.pipe(v.string(), v.uuid()),
			}),
		},
	);
