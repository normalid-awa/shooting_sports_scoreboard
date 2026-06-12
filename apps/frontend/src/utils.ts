export function emptyArrayOrValue<const C extends boolean, const V>(
	cond: C,
	arr: V | V[],
): C extends true ? [V] : [] {
	return (cond ? (Array.isArray(arr) ? arr : [arr]) : []) as C extends true
		? [V]
		: [];
}
