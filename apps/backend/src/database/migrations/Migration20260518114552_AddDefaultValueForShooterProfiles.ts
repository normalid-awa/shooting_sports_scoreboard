import { Migration } from '@mikro-orm/migrations';

export class Migration20260518114552_AddDefaultValueForShooterProfiles extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`alter table "shooter_profile" alter column "id" set default gen_random_uuid();`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "shooter_profile" alter column "id" drop default;`);
  }

}
