import {
	EntityManager,
	EntityName,
	FilterQuery,
	FindOptions,
	Loaded,
	serialize,
	SerializeDTO,
} from "@mikro-orm/postgresql";
import { ArrayElement } from "better-auth/client";
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

// TODO: convert this into a mixin pattern, but it's hard,
// as youll have to staticly type everything otherwise ts(2883) will be thrown
export class EntityManagerWithPagination extends EntityManager {
	async findAndPagination<
		Entity extends object,
		Hint extends string = never,
		Fields extends string = never,
		Excludes extends string = never,
	>(
		entityName: EntityName<Entity>,
		where: FilterQuery<NoInfer<Entity>>,
		defaultPagination: {
			orderBy: keyof Entity;
			order: "asc" | "desc";
			limit: number;
			page: number;
		},
		pagination?: {
			orderBy?: keyof Entity;
			order?: "asc" | "desc";
			limit?: number;
			page?: number;
		},
		options?: FindOptions<Entity, Hint, Fields, Excludes>,
	): Promise<{
		data: SerializeDTO<
			ArrayElement<Loaded<Entity, Hint, Fields, Excludes>[]>,
			Hint,
			Excludes
		>[];
		pagination: {
			total: number;
			totalPages: number;
			hasNextPage: boolean;
			hasPreviousPage: boolean;
		};
	}> {
		const [result, count] = await this.findAndCount(entityName, where, {
			...options,
			limit: pagination?.limit || defaultPagination.limit,
			offset:
				(pagination?.limit || defaultPagination.limit) *
				((pagination?.page || defaultPagination.page) - 1),
			//@ts-expect-error
			orderBy: {
				[pagination?.orderBy || defaultPagination.orderBy]:
					pagination?.order || defaultPagination.order,
			},
		});

		return {
			data: serialize(result),
			pagination: {
				total: count,
				totalPages: Math.ceil(
					count / (pagination?.limit || defaultPagination.limit),
				),
				hasNextPage:
					count >
					(pagination?.limit || defaultPagination.limit) *
						(pagination?.page || defaultPagination.page),
				hasPreviousPage: (pagination?.page || defaultPagination.page) > 1,
			},
		};
	}
}
