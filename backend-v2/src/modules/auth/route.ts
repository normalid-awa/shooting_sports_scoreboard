import Elysia from "elysia";
import { auth } from "./auth";

export const authRoute = new Elysia({
	prefix: "/auth",
}).mount(auth.handler);
