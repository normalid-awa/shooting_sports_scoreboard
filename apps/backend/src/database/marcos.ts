import orm from "@/database/orm.js";
import { RequestContext } from "@mikro-orm/core";
import { Elysia } from "elysia";

export const ormMarco = new Elysia({ name: "orm" })
	.derive({ as: "global" }, () => {
		const _orm = orm();
		return {
			orm: _orm,
			em: _orm.em.fork(),
		};
	})
	.onBeforeHandle(({ em }) => {
		RequestContext.enter(em);
	});
