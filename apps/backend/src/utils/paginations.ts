import { asc, desc } from "drizzle-orm";
import { PgSelect, PgTableWithColumns } from "drizzle-orm/pg-core";
import * as v from "valibot";

export function createPaginationQuerySchema<const T extends readonly string[]>(
	orderableFields: T,
	limit: { min: number; max: number },
) {
	return v.cache(
		v.optional(
			v.object({
				orderBy: v.optional(v.picklist(orderableFields)),
				order: v.optional(v.picklist(["asc", "desc"])),
				limit: v.optional(
					v.pipe(
						v.number(),
						v.integer(),
						v.minValue(limit.min),
						v.maxValue(limit.max),
					),
				),
				page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
			}),
		),
	);
}

export async function withPagination<
	Qb extends PgSelect,
	OrderByKeys extends object,
>(
	queryBuilder: Qb,
	schema: PgTableWithColumns<any>,
	defaultPagination: {
		orderBy: keyof OrderByKeys;
		order: "asc" | "desc";
		limit: number;
		page: number;
	},
	pagination?: {
		orderBy?: keyof OrderByKeys;
		order?: "asc" | "desc";
		limit?: number;
		page?: number;
	},
) {
	const totalItems = (await queryBuilder).length;
	const result = await queryBuilder
		.orderBy(
			(pagination?.order || defaultPagination.order) == "asc"
				? asc(schema[pagination?.orderBy || defaultPagination.orderBy])
				: desc(schema[pagination?.orderBy || defaultPagination.orderBy]),
		)
		.limit(pagination?.limit || defaultPagination.limit)
		.offset(
			(pagination?.limit || defaultPagination.limit) *
				((pagination?.page || defaultPagination.page) - 1),
		);
	return {
		data: result,
		pagination: {
			total: totalItems,
			totalPages: Math.ceil(
				totalItems / (pagination?.limit || defaultPagination.limit),
			),
			hasNextPage:
				totalItems >
				(pagination?.limit || defaultPagination.limit) *
					(pagination?.page || defaultPagination.page),
			hasPreviousPage: (pagination?.page || defaultPagination.page) > 1,
		},
	};
}
