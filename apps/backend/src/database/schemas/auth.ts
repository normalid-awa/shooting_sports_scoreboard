import { Cascade, defineEntity, InferEntity, p } from "@mikro-orm/core";

export const UserSchema = defineEntity({
	name: "User",
	properties: {
		id: p.uuid().primary(),
		name: p.string(),
		email: p.string().unique(),
		emailVerified: p.boolean().default(false),
		image: p.string().nullable(),
		createdAt: p.datetime().onCreate(() => new Date()),
		updatedAt: p
			.datetime()
			.onCreate(() => new Date())
			.onUpdate(() => new Date()),
	},
});

export type User = InferEntity<typeof UserSchema>;

export const SessionSchema = defineEntity({
	name: "Session",
	properties: {
		id: p.uuid().primary(),
		expiresAt: p.datetime(),
		token: p.string().unique(),
		createdAt: p.datetime().onCreate(() => new Date()),
		updatedAt: p
			.datetime()
			.onCreate(() => new Date())
			.onUpdate(() => new Date()),
		ipAddress: p.string().nullable(),
		userAgent: p.string().nullable(),
		user: () => p.manyToOne(UserSchema).cascade(Cascade.REMOVE),
	},
});

export type Session = InferEntity<typeof SessionSchema>;

export const AccountSchema = defineEntity({
	name: "Account",
	properties: {
		id: p.uuid().primary(),
		accountId: p.string(),
		providerId: p.string(),
		user: () => p.manyToOne(UserSchema).cascade(Cascade.REMOVE),
		accessToken: p.string().nullable(),
		refreshToken: p.string().nullable(),
		idToken: p.string().nullable(),
		accessTokenExpiresAt: p.datetime().nullable(),
		refreshTokenExpiresAt: p.datetime().nullable(),
		scope: p.string().nullable(),
		password: p.string().nullable(),
		createdAt: p.datetime().onCreate(() => new Date()),
		updatedAt: p
			.datetime()
			.onCreate(() => new Date())
			.onUpdate(() => new Date()),
	},
});

export type Account = InferEntity<typeof AccountSchema>;

export const VerificationSchema = defineEntity({
	name: "Verification",
	properties: {
		id: p.uuid().primary(),
		identifier: p.string(),
		value: p.string(),
		expiresAt: p.datetime(),
		createdAt: p.datetime().onCreate(() => new Date()),
		updatedAt: p
			.datetime()
			.onCreate(() => new Date())
			.onUpdate(() => new Date()),
	},
});

export type Verification = InferEntity<typeof VerificationSchema>;
