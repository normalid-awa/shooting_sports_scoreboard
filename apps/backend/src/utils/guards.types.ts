export type StatusCode = number;
export type Message = string;
export type GuardFunction<T extends any[]> = (
	...args: T
) =>
	| undefined
	| [StatusCode, Message]
	| Promise<undefined | [StatusCode, Message]>;
