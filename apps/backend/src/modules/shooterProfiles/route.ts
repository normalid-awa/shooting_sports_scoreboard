import { ormMarco } from "@/database/marcos.js";
import { ShooterProfileSchema } from "@/database/schemas/shooterProfiles.js";
import { createLogicalFilterSchema } from "@/utils/filters.js";
import { createPaginationQuerySchema } from "@/utils/paginations.js";
import { Sports } from "@shooting_sports_scoreboard/common";
import { Elysia } from "elysia";
import * as v from "valibot";
import { serialize } from "@mikro-orm/core";

export const shooterProfilesRoute = new Elysia({
	prefix: "shooter-profiles",
})
	.use(ormMarco)
	.get(
		"/:id",
		async ({ params: { id }, em, status }) => {
			const shooterProfile = await em.findOne(ShooterProfileSchema, id);
			if (!shooterProfile) return status(404);
			return serialize(shooterProfile);
		},
		{
			params: v.object({
				id: v.pipe(v.string(), v.uuid()),
			}),
		},
	)
	.post(
		"/list",
		async ({ body, em }) => {
			return await em.findAndPagination(
				ShooterProfileSchema,
				{},
				{
					orderBy: "name",
					order: "desc",
					limit: 10,
					page: 1,
				},
				body?.pagination,
			);
		},
		{
			body: v.optional(
				v.object({
					pagination: createPaginationQuerySchema(["id", "name"], {
						min: 1,
						max: 20,
					}),
					filter: createLogicalFilterSchema({
						name: {
							ops: ["like"],
							schema: v.string(),
						},
						sport: {
							ops: ["eq", "ne", "in", "nin"],
							schema: v.picklist(Sports),
						},
					}),
				}),
			),
		},
	);
