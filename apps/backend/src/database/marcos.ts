import orm from "@/orm";
import Elysia from "elysia";

export const ormMarco = new Elysia({ name: "orm" }).derive(
	{ as: "global" },
	() => ({
		orm: orm(),
	}),
);
