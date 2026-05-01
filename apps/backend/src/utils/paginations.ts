import { asc, desc } from "drizzle-orm";
import { PgSelect, PgTableWithColumns } from "drizzle-orm/pg-core";
import * as v from "valibot";

export function createPaginationQuerySchema<const T extends readonly string[]>(
	orderableFields: T,
	limit: { min: number; max: number },
	defaultOrdering: {
		orderBy: T[number];
		order: "asc" | "desc";
	},
) {
	return v.optional(
		v.object({
			orderBy: v.optional(v.picklist(orderableFields), defaultOrdering.orderBy),
			order: v.optional(v.picklist(["asc", "desc"]), defaultOrdering.order),
			limit: v.optional(
				v.pipe(
					v.number(),
					v.integer(),
					v.minValue(limit.min),
					v.maxValue(limit.max),
				),
				Math.floor((limit.max + limit.min) / 2),
			),
			page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1)), 1),
		}),
		{
			limit: limit.max,
			page: 1,
			orderBy: defaultOrdering.orderBy,
			order: defaultOrdering.order,
		},
	);
}

export async function withPagination<
	Qb extends PgSelect,
	OrderByKeys extends object,
>(
	queryBuilder: Qb,
	schema: PgTableWithColumns<any>,
	pagination: {
		orderBy: keyof OrderByKeys;
		order: "asc" | "desc";
		limit: number;
		page: number;
	},
) {
	const totalItems = (await queryBuilder).length;
	const result = await queryBuilder
		.orderBy(
			pagination.order == "asc"
				? asc(schema[pagination.orderBy])
				: desc(schema[pagination.orderBy]),
		)
		.limit(pagination.limit)
		.offset(pagination.limit * (pagination.page - 1));
	return {
		data: result,
		pagination: {
			total: totalItems,
			totalPages: Math.ceil(totalItems / pagination.limit),
			hasNextPage: totalItems > pagination.limit * pagination.page,
			hasPreviousPage: pagination.page > 1,
		},
	};
}
