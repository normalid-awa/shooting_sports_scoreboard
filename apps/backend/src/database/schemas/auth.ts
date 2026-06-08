import { Cascade, Collection } from "@mikro-orm/core";
import { ShooterProfile } from "./shooterProfiles.js";
import {
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
} from "@mikro-orm/decorators/es";

@Entity()
export class User {
	@PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
	id!: string;

	@Property()
	name!: string;

	@Property({ unique: true })
	email!: string;

	@Property()
	emailVerified!: boolean;

	@Property()
	image?: string;

	@Property({ onCreate: () => new Date() })
	createdAt!: Date;

	@Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
	updatedAt!: Date;

	@OneToMany(() => ShooterProfile, (shooterProfile) => shooterProfile.user)
	shooterProfiles = new Collection<ShooterProfile>(this);

	@Property()
	realname?: string;
}

@Entity()
export class Session {
	@PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
	id!: string;

	@Property()
	expiresAt!: Date;

	@Property({ unique: true })
	token!: string;

	@Property({ onCreate: () => new Date() })
	createdAt!: Date;

	@Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
	updatedAt!: Date;

	@Property()
	ipAddress?: string;

	@Property()
	userAgent?: string;

	@ManyToOne({ cascade: [Cascade.REMOVE] })
	user!: User;
}

@Entity()
export class Account {
	@PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
	id!: string;

	@Property()
	accountId!: string;

	@Property()
	providerId!: string;

	@ManyToOne({ cascade: [Cascade.REMOVE] })
	user!: User;

	@Property()
	accessToken?: string;

	@Property()
	refreshToken?: string;

	@Property()
	idToken?: string;

	@Property()
	accessTokenExpiresAt?: Date;

	@Property()
	refreshTokenExpiresAt?: Date;

	@Property()
	scope?: string;

	@Property()
	password?: string;

	@Property({ onCreate: () => new Date() })
	createdAt!: Date;

	@Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
	updatedAt!: Date;
}

@Entity()
export class Verification {
	@PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
	id!: string;

	@Property()
	identifier!: string;

	@Property()
	value!: string;

	@Property()
	expiresAt!: Date;

	@Property({ onCreate: () => new Date() })
	createdAt!: Date;

	@Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
	updatedAt!: Date;
}
