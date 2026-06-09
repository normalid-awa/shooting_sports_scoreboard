import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const getIsomorphicRequestHeaders = createIsomorphicFn()
	.client(() => undefined)
	.server(() => getRequestHeaders());
