import {
	and,
	between,
	Column,
	eq,
	gt,
	gte,
	ilike,
	inArray,
	like,
	lt,
	lte,
	ne,
	notBetween,
	notIlike,
	notInArray,
	notLike,
	or,
	SQL,
	BinaryOperator as SqlUnaryOperator,
} from "drizzle-orm";
import { PgSelect, PgTableWithColumns } from "drizzle-orm/pg-core";
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
	v.literal("nlike"),
	v.literal("ilike"),
	v.literal("nilike"),
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

function isUnaryOperator(operator: string): operator is UnaryOperator {
	return unaryOperator.options.some((o) => o.literal === operator);
}

function isBinaryOperator(operator: string): operator is BinaryOperator {
	return binaryOperator.options.some((o) => o.literal === operator);
}

function isPolyadicOperator(operator: string): operator is PolyadicOperator {
	return polyadicOperator.options.some((o) => o.literal === operator);
}

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

const unaryOperatorsMap: Record<
	string,
	SqlUnaryOperator | ((column: Column<any>, value: any) => SQL)
> = {
	eq: eq,
	ne: ne,
	gt: gt,
	gte: gte,
	lt: lt,
	lte: lte,
	like: like,
	nlike: notLike,
	ilike: ilike,
	nilike: notIlike,
};

const binaryOperatorsMap: Record<
	string,
	(column: Column<any>, value1: any, value2: any) => SQL
> = {
	btw: between,
	nbtw: notBetween,
};

const polyadicOperatorsMap: Record<
	string,
	(column: Column<any>, values: any[]) => SQL
> = {
	in: inArray,
	nin: notInArray,
};

type Filters =
	| LogicalFilter<any>
	| UnaryFilter<string, any, any>
	| BinaryFilter<string, any, any>
	| PolyadicFilter<string, any, any>;

export function applyFilter(
	schema: PgTableWithColumns<any>,
	filter: Filters | Filters[],
): SQL<unknown>[] {
	const filters: SQL<unknown>[] = [];

	if ("logic" in filter) {
		switch (filter.logic) {
			case "and":
				filters.push(
					and(...applyFilter(schema, filter.conditions as Filters[]))!,
				);
				break;
			case "or":
				filters.push(
					or(...applyFilter(schema, filter.conditions as Filters[]))!,
				);
				break;
		}
	} else if (Array.isArray(filter)) {
		filters.push(...filter.map((f) => applyFilter(schema, f)).flat());
	} else {
		if (isUnaryOperator(filter.operator)) {
			filters.push(
				unaryOperatorsMap[filter.operator](schema[filter.field], filter.value),
			);
		} else if (isBinaryOperator(filter.operator)) {
			filters.push(
				binaryOperatorsMap[filter.operator](
					schema[filter.field],
					filter.value[0],
					filter.value[1],
				),
			);
		} else if (isPolyadicOperator(filter.operator)) {
			filters.push(
				polyadicOperatorsMap[filter.operator](
					schema[filter.field],
					filter.value,
				),
			);
		}
	}

	return filters;
}

export function withFilters<
	const QueryBuilder extends PgSelect,
	const Schema extends PgTableWithColumns<any>,
>(
	queryBuilder: QueryBuilder,
	schema: Schema,
	filter?: LogicalFilter<Schema["_"]["columns"]>,
) {
	if (filter) return queryBuilder.where(and(...applyFilter(schema, filter)));
	return queryBuilder;
}
