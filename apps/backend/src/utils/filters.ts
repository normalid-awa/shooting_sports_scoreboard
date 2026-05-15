import { FilterQuery } from "@mikro-orm/core";
import { InferEntityProperties } from "@mikro-orm/postgresql";
import * as v from "valibot";

const logicalOperator = v.union([v.literal("and"), v.literal("or")] as const);
export type LogicalOperator = v.InferInput<typeof logicalOperator>;

const unaryOperator = v.union([
	v.literal("eq"),
	v.literal("ne"),
	v.literal("gt"),
	v.literal("gte"),
	v.literal("lt"),
	v.literal("lte"),
	v.literal("like"),
	v.literal("ilike"),
	v.literal("fulltext"),
] as const);
export type UnaryOperator = v.InferInput<typeof unaryOperator>;
export type UnaryFilter<
	Field,
	AllowedOperators extends UnaryOperator[],
	Type,
> = {
	field: Field;
	operator: AllowedOperators[number];
	value: Type;
};
export function createUnaryFilterSchema<
	const Field extends string,
	const AllowedOperators extends UnaryOperator[],
	const Schema extends v.GenericSchema,
>(
	field: Field,
	allowedOperators: AllowedOperators,
	schema: Schema,
): v.GenericSchema<UnaryFilter<Field, AllowedOperators, v.InferInput<Schema>>> {
	return v.object({
		field: v.literal(field),
		operator: v.picklist(allowedOperators),
		value: schema as v.GenericSchema<v.InferInput<Schema>>,
	} as const);
}

const binaryOperator = v.union([v.literal("btw"), v.literal("nbtw")] as const);
export type BinaryOperator = v.InferInput<typeof binaryOperator>;
export type BinaryFilter<
	Field,
	AllowedOperators extends BinaryOperator[],
	Type,
> = {
	field: Field;
	operator: AllowedOperators[number];
	value: [Type, Type];
};
export function createBinaryFilterSchema<
	const Field extends string,
	const AllowedOperators extends BinaryOperator[],
	const Schema extends v.GenericSchema,
>(
	field: Field,
	allowedOperators: AllowedOperators,
	schema: Schema,
): v.GenericSchema<
	BinaryFilter<Field, AllowedOperators, v.InferInput<Schema>>
> {
	return v.object({
		field: v.literal(field),
		operator: v.picklist(allowedOperators),
		value: v.strictTuple([schema, schema]) as v.GenericSchema<
			[v.InferInput<Schema>, v.InferInput<Schema>]
		>,
	} as const);
}

const polyadicOperator = v.union([v.literal("in"), v.literal("nin")] as const);
export type PolyadicOperator = v.InferInput<typeof polyadicOperator>;
export type PolyadicFilter<
	Field,
	AllowedOperators extends PolyadicOperator[],
	Type,
> = {
	field: Field;
	operator: AllowedOperators[number];
	value: Type[];
};
export function createPolyadicFilterSchema<
	const Field extends string,
	const AllowedOperators extends PolyadicOperator[],
	const Schema extends v.GenericSchema,
>(
	field: Field,
	allowedOperators: AllowedOperators,
	schema: Schema,
): v.GenericSchema<
	PolyadicFilter<Field, AllowedOperators, v.InferInput<Schema>>
> {
	return v.object({
		field: v.literal(field),
		operator: v.picklist(allowedOperators),
		value: v.array(schema),
	} as const);
}

export type FilterableFields = {
	[Field in string]: {
		ops: (UnaryOperator | BinaryOperator | PolyadicOperator)[];
		schema: v.GenericSchema;
	};
};

export type LogicalFilter<Fields extends FilterableFields> = {
	logic: LogicalOperator;
	conditions: {
		[Field in keyof Fields as number]:
			| LogicalFilter<Fields>
			| UnaryFilter<
					Field,
					Fields[Field]["ops"][number] & UnaryOperator[],
					v.InferInput<Fields[Field]["schema"]>
			  >
			| BinaryFilter<
					Field,
					Fields[Field]["ops"][number] & BinaryOperator[],
					v.InferInput<Fields[Field]["schema"]>
			  >
			| PolyadicFilter<
					Field,
					Fields[Field]["ops"][number] & PolyadicOperator[],
					v.InferInput<Fields[Field]["schema"]>
			  >;
	};
};
export function createLogicalFilterSchema<
	const Fields extends FilterableFields,
>(
	filterableFields: Fields,
): v.GenericSchema<LogicalFilter<Fields> | undefined> {
	const comparisonFilterSchemas = Object.entries(filterableFields)
		.map(([field, { ops, schema }]) => {
			const unaryOps = ops.filter((op) =>
				unaryOperator.options.find((o) => o.literal === op),
			) as UnaryOperator[];
			const binaryOps = ops.filter((op) =>
				binaryOperator.options.find((o) => o.literal === op),
			) as BinaryOperator[];
			const polyadicOps = ops.filter((op) =>
				polyadicOperator.options.find((o) => o.literal === op),
			) as PolyadicOperator[];
			const filters: v.GenericSchema[] = [];
			if (unaryOps.length > 0) {
				filters.push(createUnaryFilterSchema(field, unaryOps, schema));
			}
			if (binaryOps.length > 0) {
				filters.push(createBinaryFilterSchema(field, binaryOps, schema));
			}
			if (polyadicOps.length > 0) {
				filters.push(createPolyadicFilterSchema(field, polyadicOps, schema));
			}
			return filters;
		})
		.flat();

	return v.cache(
		v.optional(
			v.object({
				logic: logicalOperator,
				conditions: v.array(
					v.union([
						...comparisonFilterSchemas,
						v.lazy(() => createLogicalFilterSchema(filterableFields)),
					] as const),
				),
			}) as v.GenericSchema<LogicalFilter<Fields>>,
		),
	);
}

function isUnaryOperator(operator: string): operator is UnaryOperator {
	return unaryOperator.options.some((o) => o.literal === operator);
}

function isBinaryOperator(operator: string): operator is BinaryOperator {
	return binaryOperator.options.some((o) => o.literal === operator);
}

function isPolyadicOperator(operator: string): operator is PolyadicOperator {
	return polyadicOperator.options.some((o) => o.literal === operator);
}

function isLogicalFilter(filter: Filters): filter is LogicalFilter<any> {
	return (
		typeof filter === "object" && "logic" in filter && "conditions" in filter
	);
}

function isValueFilter(
	filters: Filters,
): filters is
	| UnaryFilter<string, any, any>
	| BinaryFilter<string, any, any>
	| PolyadicFilter<string, any, any> {
	return !isLogicalFilter(filters);
}

type Filters =
	| LogicalFilter<any>
	| UnaryFilter<string, any, any>
	| BinaryFilter<string, any, any>
	| PolyadicFilter<string, any, any>;

export function whereClauseFromFilter(
	filter?: LogicalFilter<InferEntityProperties<any>> | Filters,
): FilterQuery<NoInfer<any>> | {} {
	if (!filter) {
		return {};
	}

	if (isLogicalFilter(filter)) {
		if (filter.logic === "and") {
			return {
				$and: Object.values(filter.conditions).map((c) =>
					whereClauseFromFilter(c),
				),
			};
		} else if (filter.logic === "or") {
			return {
				$or: Object.values(filter.conditions).map((c) =>
					whereClauseFromFilter(c),
				),
			};
		}
	} else if (isValueFilter(filter)) {
		const { field, operator, value } = filter;
		if (isUnaryOperator(operator)) {
			return { [field]: { [`$${operator}`]: value } };
		} else if (isBinaryOperator(operator)) {
			return { [field]: { [`$${operator}`]: value } };
		} else if (isPolyadicOperator(operator)) {
			return { [field]: { [`$${operator}`]: value } };
		}
	}

	throw new Error("Unsupported Operation/Filter");
}
