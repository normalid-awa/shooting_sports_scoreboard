import { ormMarco } from "@/database/marcos.js";
import { ShooterProfileSchema } from "@/database/schemas/shooterProfiles.js";
import { createLogicalFilterSchema, withFilters } from "@/utils/filters.js";
import {
	createPaginationQuerySchema,
	withPagination,
} from "@/utils/paginations.js";
import { Sports } from "@shooting_sports_scoreboard/common";
import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import * as v from "valibot";
import { authMarco } from "../auth/marco.js";

export const shooterProfilesRoute = new Elysia({
	prefix: "shooter-profiles",
})
	.use(ormMarco)
	.use(authMarco)
	.get(
		"/:id",
		async ({ params: { id }, em, status }) => {
			// const result = await orm
			// 	.select()
			// 	.from(shooterProfiles)
			// 	.where(eq(shooterProfiles.id, id));
			// if (result.length === 0) return status(404);
			// return result[0];
			return await em.findOne(ShooterProfileSchema, id);
		},
		{
			params: v.object({
				id: v.pipe(v.string(), v.uuid()),
			}),
			auth: true,
		},
	)
	.post(
		"/list",
		async ({ body, orm }) => {
			// let qb = orm.select().from(shooterProfiles).$dynamic();
			// qb = withFilters(qb, shooterProfiles, body?.filter);
			// return await withPagination(
			// 	qb,
			// 	shooterProfiles,
			// 	{
			// 		orderBy: "createdAt",
			// 		order: "desc",
			// 		limit: 10,
			// 		page: 1,
			// 	},
			// 	body?.pagination,
			// );
		},
		{
			body: v.optional(
				v.object({
					pagination: createPaginationQuerySchema(["id", "createdAt"], {
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
